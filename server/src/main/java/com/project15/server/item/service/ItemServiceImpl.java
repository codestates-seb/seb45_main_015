package com.project15.server.item.service;

import com.project15.server.category.entity.Category;
import com.project15.server.category.service.CategoryService;
import com.project15.server.exception.ExceptionCode;
import com.project15.server.exception.GlobalException;
import com.project15.server.item.dto.ItemDto;
import com.project15.server.item.entity.Item;
import com.project15.server.item.entity.ItemStatus;
import com.project15.server.item.mapper.ItemMapper;
import com.project15.server.item.repository.ItemImageRepository;
import com.project15.server.item.repository.ItemRepository;
import com.project15.server.item.entity.ItemImage;
import com.project15.server.item.repository.ItemSpecification;
import com.project15.server.member.entity.Member;
import com.project15.server.member.repository.MemberRepository;
import com.project15.server.member.service.MemberService;
import com.project15.server.s3.service.S3ServiceImpl;
import com.project15.server.wish.entity.Wish;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional(isolation = Isolation.REPEATABLE_READ)
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService{

    private final S3ServiceImpl s3Service;

    private final CategoryService categoryService;

    private final ItemMapper itemMapper;

    private final ItemRepository itemRepository;

    private final ItemImageRepository itemImageRepository;

    private final MemberRepository memberRepository;

    @Override
    @CachePut(value = "itemCache", key = "#itemId", cacheManager = "cacheManager")
    public ItemDto.ResponseDto createImage(Long itemId, List<MultipartFile> images) {
        Item findItem = findVerifiedItem(itemId);

        //file(image)을 S3에 저장하면서 저장된 주소(URL)를 생성
        List<String> urlList = images
                .stream()
                .map(s3Service::uploadFileToS3)
                .collect(Collectors.toList());

        List<ItemImage> itemImages = images
                .stream()
                .map(image -> itemMapper.fileToItemImage(image, itemId, urlList))
                .collect(Collectors.toList());

        itemImages.forEach(itemImageRepository::save);

        return itemMapper.itemToResponseDto(findItem, null);
    }

    @Override
    public ItemDto.ResponseDto createItem(Item item, int dateUntilEnd) {
        Item savedItem = itemRepository.save(item);

        //10보다 큰 값으로 들어온 end_time 은 추후 테스트 시현을 위한 초 단위 이므로 따로 초에 더해줌
        LocalDateTime endTime = checkDateUntilEndIsDayOrSec(item.getCreatedAt(), dateUntilEnd);

        savedItem.setEndTime(endTime);

        return itemMapper.itemToResponseDto(savedItem, null);
    }

    @Override
    @Cacheable(value = "itemCache", key = "#itemId", cacheManager = "cacheManager")
    public ItemDto.ResponseDto findItem(Long itemId, Long watcherId) {
        Item findItem = findVerifiedItem(itemId);
        Member findMember;
        List<Wish> wishes;
        List<Long> itemIds;

        //responseDto에 Item GET요청을 보낸 member의 wish 여부를 적용하기 위한 로직
        if(watcherId == null) {
            itemIds = null;
        }
        else {
            findMember = memberRepository
                    .findById(watcherId)
                    .orElseThrow(() -> new GlobalException(ExceptionCode.MEMBER_NOT_FOUND));

            wishes = findMember.getWishes();
            itemIds = wishes.stream()
                    .map(wish -> wish.getItem().getItemId())
                    .collect(Collectors.toList());
        }

        if(isStatusBidding(findItem.getCreatedAt()) && findItem.getStatus().equals(ItemStatus.WAITING)) {
            findItem.setStatus(ItemStatus.BIDDING);
        }

        return itemMapper.itemToResponseDto(findItem, itemIds);
    }

    @Override
    public ItemDto.MultiResponseDto findItems(int pageNumber, int pageSize, Long watcherId) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("createdAt").descending());
        Page<Item> itemPage = itemRepository.findAll(pageable);

        Member findMember;
        List<Wish> wishes;
        List<Long> itemIds;

        //responseDto에 Item GET요청을 보낸 member의 wish 여부를 적용하기 위한 로직
        if(watcherId == null) {
            itemIds = null;
        }
        else {
            findMember = memberRepository
                    .findById(watcherId)
                    .orElseThrow(() -> new GlobalException(ExceptionCode.MEMBER_NOT_FOUND));

            wishes = findMember.getWishes();
            itemIds = wishes.stream()
                    .map(wish -> wish.getItem().getItemId())
                    .collect(Collectors.toList());
        }

        itemPage.getContent().stream()
                .filter(item -> isStatusBidding(item.getCreatedAt()) && item.getStatus().equals(ItemStatus.WAITING))
                .forEach(item -> item.setStatus(ItemStatus.BIDDING));

        return itemMapper.itemPageToMultiResponseDto(itemPage, itemIds);
    }

    public ItemDto.MultiResponseDto findMyItems(int pageNumber, int pageSize, Long memberId) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("createdAt").descending());
        Page<Item> itemPage = itemRepository.findBySellerMemberId(memberId, pageable);

        Member findMember;
        List<Wish> wishes;
        List<Long> itemIds;

        //responseDto에 Item GET요청을 보낸 member의 wish 여부를 적용하기 위한 로직
        if(memberId == null) {
            itemIds = null;
        }
        else {
            findMember = memberRepository
                    .findById(memberId)
                    .orElseThrow(() -> new GlobalException(ExceptionCode.MEMBER_NOT_FOUND));

            wishes = findMember.getWishes();
            itemIds = wishes.stream()
                    .map(wish -> wish.getItem().getItemId())
                    .collect(Collectors.toList());
        }

        itemPage.getContent().stream()
                .filter(item -> isStatusBidding(item.getCreatedAt()) && item.getStatus().equals(ItemStatus.WAITING))
                .forEach(item -> item.setStatus(ItemStatus.BIDDING));

        return itemMapper.itemPageToMultiResponseDto(itemPage, itemIds);
    }

    @Override
    public ItemDto.MultiResponseDto findItemsByCategory(int pageNumber, int pageSize, Long categoryId, Long watcherId) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("createdAt").descending());
        Page<Item> itemPage = itemRepository.findByCategoryCategoryId(categoryId, pageable);

        Member findMember;
        List<Wish> wishes;
        List<Long> itemIds;

        //responseDto에 Item GET요청을 보낸 member의 wish 여부를 적용하기 위한 로직
        if(watcherId == null) {
            itemIds = null;
        }
        else {
            findMember = memberRepository
                    .findById(watcherId)
                    .orElseThrow(() -> new GlobalException(ExceptionCode.MEMBER_NOT_FOUND));

            wishes = findMember.getWishes();
            itemIds = wishes.stream()
                    .map(wish -> wish.getItem().getItemId())
                    .collect(Collectors.toList());
        }

        itemPage.getContent().stream()
                .filter(item -> isStatusBidding(item.getCreatedAt()) && item.getStatus().equals(ItemStatus.WAITING))
                .forEach(item -> item.setStatus(ItemStatus.BIDDING));

        return itemMapper.itemPageToMultiResponseDto(itemPage, itemIds);
    }

    @Override
    public ItemDto.MultiResponseDto findItemsByStatus(int pageNumber, int pageSize, String itemStatus, Long sellerId) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("createdAt").descending());
        Page<Item> itemPage = itemRepository.findBySellerMemberIdAndStatus(sellerId, ItemStatus.valueOf(itemStatus), pageable);

        Member findMember;
        List<Wish> wishes;
        List<Long> itemIds;

        //responseDto에 Item GET요청을 보낸 member의 wish 여부를 적용하기 위한 로직
        if(sellerId == null) {
            itemIds = null;
        }
        else {
            findMember = memberRepository
                    .findById(sellerId)
                    .orElseThrow(() -> new GlobalException(ExceptionCode.MEMBER_NOT_FOUND));

            wishes = findMember.getWishes();
            itemIds = wishes.stream()
                    .map(wish -> wish.getItem().getItemId())
                    .collect(Collectors.toList());
        }

        itemPage.getContent().stream()
                .filter(item -> isStatusBidding(item.getCreatedAt()) && item.getStatus().equals(ItemStatus.WAITING))
                .forEach(item -> item.setStatus(ItemStatus.BIDDING));

        return itemMapper.itemPageToMultiResponseDto(itemPage, itemIds);
    }

    @Override
    public ItemDto.MultiResponseDto findItemsByKeyword(int pageNumber, int pageSize, String keyword, Long watcherId) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("createdAt").descending());

        String[] keywordArray = keyword.split(" ");

        List<String> keywords = new ArrayList<>(Arrays.asList(keywordArray));

        keywords.removeIf(String::isEmpty);
        keywords.replaceAll(String::trim);

        Specification<Item> itemSpecification = ItemSpecification.contentContainsKeywords(keywords);

        Member findMember;
        List<Wish> wishes;
        List<Long> itemIds;

        Page<Item> itemPage = itemRepository.findAll(itemSpecification, pageable);

        //responseDto에 Item GET요청을 보낸 member의 wish 여부를 적용하기 위한 로직
        if(watcherId == null) {
            itemIds = null;
        }
        else {
            findMember = memberRepository
                    .findById(watcherId)
                    .orElseThrow(() -> new GlobalException(ExceptionCode.MEMBER_NOT_FOUND));

            wishes = findMember.getWishes();
            itemIds = wishes.stream()
                    .map(wish -> wish.getItem().getItemId())
                    .collect(Collectors.toList());
        }

        itemPage.getContent().stream()
                .filter(item -> isStatusBidding(item.getCreatedAt()) && item.getStatus().equals(ItemStatus.WAITING))
                .forEach(item -> item.setStatus(ItemStatus.BIDDING));

        return itemMapper.itemPageToMultiResponseDto(itemPage, itemIds);
    }

    @Override
    @CachePut(value = "itemCache", key = "#itemId", cacheManager = "cacheManager")
    public ItemDto.ResponseDto updateItem(ItemDto.PatchDto patchDto, Long itemId) {
        Item findItem = findVerifiedItem(patchDto.getItem_id());

        //신청자가 글 작성자인지 확인
        if (!findItem.getSeller().getMemberId().equals(patchDto.getSeller_id())) {
            throw new GlobalException(ExceptionCode.SELLER_MISS_MATCH);
        }

        LocalDateTime currentTime = LocalDateTime.now();
        if (!findItem.getStatus().equals(ItemStatus.WAITING) || currentTime.isAfter(findItem.getEndTime())) {
            throw new GlobalException(ExceptionCode.NOT_IN_WAITING);
        }

        Optional.ofNullable(patchDto.getTitle()).ifPresent(findItem::setTitle);
        Optional.ofNullable(patchDto.getContent()).ifPresent(findItem::setContent);

        if (patchDto.getCategory_id() != null) {
            Category category = categoryService.findVerifiedCategory(patchDto.getCategory_id());
            findItem.setCategory(category);
        }

        if (patchDto.getEnd_time() != null) {
            LocalDateTime endTime = checkDateUntilEndIsDayOrSec(findItem.getCreatedAt(), patchDto.getEnd_time());

            findItem.setEndTime(endTime);
        }

        Optional.ofNullable(patchDto.getStart_price()).ifPresent(findItem::setStartPrice);
        Optional.ofNullable(patchDto.getBid_unit()).ifPresent(findItem::setBidUnit);
        findItem.setBuyNowPrice(patchDto.getBuy_now_price());

        return itemMapper.itemToResponseDto(findItem, null);
    }

    @Override
    public void removeImage(Long itemId, Long sellerId, List<String> deleteImageUrls) {
        Item findItem = findVerifiedItem(itemId);

        if(!findItem.getSeller().getMemberId().equals(sellerId)) {
            throw new GlobalException(ExceptionCode.SELLER_MISS_MATCH);
        }

        List<String> deleteImageKeys = new ArrayList<>();
        deleteImageUrls.forEach(url -> deleteImageKeys.add(url.substring(url.lastIndexOf("/") + 1)));

        if(isWaiting(findItem.getEndTime())) {
            deleteImageKeys.forEach(s3Service::deleteFileAtS3);

            List<ItemImage> findItemImages = deleteImageUrls
                    .stream()
                    .map(this::findVerifiedItemImage)
                    .collect(Collectors.toList());

            findItemImages.forEach(itemImageRepository::delete);
        }
    }

    @Override
    @CacheEvict(value = "itemCache", key = "#itemId", cacheManager = "cacheManager")
    public void removeItem(Long itemId, Long sellerId) {
        Item findItem = findVerifiedItem(itemId);

        if(findItem.getSeller().getMemberId().equals(sellerId)) {
            throw new GlobalException(ExceptionCode.SELLER_MISS_MATCH);
        }

        if(isWaiting(findItem.getEndTime())) {
            itemRepository.delete(findItem);
        }
    }

    @Override
    public Item findVerifiedItem(Long itemId) {
        return itemRepository
                .findById(itemId)
                .orElseThrow(() -> new GlobalException(ExceptionCode.ITEM_NOT_FOUND));
    }

    @Override
    public ItemImage findVerifiedItemImage(String imageUrl) {
        return itemImageRepository
                .findByImageUrl(imageUrl)
                .orElseThrow(() -> new GlobalException(ExceptionCode.IMAGE_NOT_FOUND));
    }

    private boolean isWaiting(LocalDateTime endTime) {
        LocalDateTime currentTime = LocalDateTime.now();
        if(currentTime.isBefore(endTime)) {
            return true;
        }
        return false;
    }

    private boolean isStatusBidding(LocalDateTime createAt) {
        LocalDateTime auctionStartTime = createAt.plusMinutes(5);
        LocalDateTime currentTime = LocalDateTime.now();

        if(auctionStartTime.isBefore(currentTime)) {
            return true;
        }
        return false;
    }

    private LocalDateTime checkDateUntilEndIsDayOrSec(LocalDateTime createdAt, int dateUntilEnd) {
        if(dateUntilEnd < 10) {
            return createdAt.plusDays(dateUntilEnd);
        }
        else {
            return createdAt.plusSeconds(dateUntilEnd);
        }
    }
}
