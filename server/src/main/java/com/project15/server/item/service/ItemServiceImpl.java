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
import com.project15.server.s3.service.S3ServiceImpl;
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
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
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

    @PersistenceContext
    private EntityManager entityManager;

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

        return itemMapper.itemToResponseDto(findItem);
    }

    @Override
    public void createItem(Item item, int dateUntilEnd) {
        Item savedItem = itemRepository.save(item);

        //10보다 큰 값으로 들어온 end_time 은 추후 테스트 시현을 위한 초 단위 이므로 따로 초에 더해줌
        LocalDateTime endTime;

        if(dateUntilEnd < 10) {
            endTime = item.getCreatedAt().plusDays(dateUntilEnd);
        }
        else {
            endTime = item.getCreatedAt().plusSeconds(dateUntilEnd);
        }

        savedItem.setEndTime(endTime);
    }

    @Override
    @Cacheable(value = "itemCache", key = "#itemId", cacheManager = "cacheManager")
    public ItemDto.ResponseDto findItem(Long itemId) {
        Item findItem = findVerifiedItem(itemId);
        if(isStatusBidding(findItem.getCreatedAt()) && findItem.getStatus().equals(ItemStatus.WAITING)) {
            findItem.setStatus(ItemStatus.BIDDING);
        }

        return itemMapper.itemToResponseDto(findItem);
    }

    @Override
    public Page<Item> findItems(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("createdAt").descending());
        Page<Item> itemPage = itemRepository.findAll(pageable);

        itemPage.getContent().stream()
                .filter(item -> isStatusBidding(item.getCreatedAt()) && item.getStatus().equals(ItemStatus.WAITING))
                .forEach(item -> item.setStatus(ItemStatus.BIDDING));

        return itemPage;
    }

    @Override
    public Page<Item> findItems(int pageNumber, int pageSize, Long categoryId) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("createdAt").descending());
        Page<Item> itemPage = itemRepository.findByCategoryCategoryId(categoryId, pageable);

        itemPage.getContent().stream()
                .filter(item -> isStatusBidding(item.getCreatedAt()) && item.getStatus().equals(ItemStatus.WAITING))
                .forEach(item -> item.setStatus(ItemStatus.BIDDING));

        return itemPage;
    }

    @Override
    public Page<Item> findItems(int pageNumber, int pageSize, String itemStatus, Long sellerId) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("createdAt").descending());
        Page<Item> itemPage = itemRepository.findBySellerMemberIdAndStatus(sellerId, ItemStatus.valueOf(itemStatus), pageable);

        itemPage.getContent().stream()
                .filter(item -> isStatusBidding(item.getCreatedAt()) && item.getStatus().equals(ItemStatus.WAITING))
                .forEach(item -> item.setStatus(ItemStatus.BIDDING));

        return itemPage;
    }

    @Override
    public Page<Item> findItems(int pageNumber, int pageSize, String keyword) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("createdAt").descending());

        String[] keywordArray = keyword.split(" ");

        List<String> keywords = new ArrayList<>(Arrays.asList(keywordArray));

        keywords.removeIf(String::isEmpty);

        Specification<Item> itemSpecification = ItemSpecification.contentContainsKeywords(keywords);

        return itemRepository.findAll(itemSpecification, pageable);
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
            LocalDateTime endTime;
            if (patchDto.getEnd_time() < 10) {
                endTime = findItem.getCreatedAt().plusDays(patchDto.getEnd_time());
            } else {
                endTime = findItem.getCreatedAt().plusSeconds(patchDto.getEnd_time());
            }
            findItem.setEndTime(endTime);
        }

        Optional.ofNullable(patchDto.getStart_price()).ifPresent(findItem::setStartPrice);
        Optional.ofNullable(patchDto.getBid_unit()).ifPresent(findItem::setBidUnit);
        findItem.setBuyNowPrice(patchDto.getBuy_now_price());

        return itemMapper.itemToResponseDto(findItem);
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
}
