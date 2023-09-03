package com.project15.server.item.service;

import com.project15.server.category.entity.Category;
import com.project15.server.category.repository.CategoryRepository;
import com.project15.server.category.service.CategoryService;
import com.project15.server.category.service.CategoryServiceImpl;
import com.project15.server.exception.ExceptionCode;
import com.project15.server.exception.GlobalException;
import com.project15.server.item.dto.ItemDto;
import com.project15.server.item.entity.Item;
import com.project15.server.item.entity.ItemStatus;
import com.project15.server.item.mapper.ItemMapper;
import com.project15.server.item.repository.ItemImageRepository;
import com.project15.server.item.repository.ItemRepository;
import com.project15.server.item.entity.ItemImage;
import com.project15.server.s3.service.S3ServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService{

    private final S3ServiceImpl s3Service;

    private final ItemMapper itemMapper;

    private final ItemRepository itemRepository;

    private final ItemImageRepository itemImageRepository;

    @Override
    public void createImage(Long itemId, List<MultipartFile> images) {
        findVerifiedItem(itemId);

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
    }

    @Override
    public void createItem(Item item, int dateUntilEnd) {
        if(item.getBuyNowPrice() != null) {
            item.setBuyNow("Y");
        }

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
    public Item findItem(Long itemId) {
        Item findItem = findVerifiedItem(itemId);

        return findItem;
    }

    @Override
    public Page<Item> findItems(int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("createdAt").descending());
        Page<Item> itemPage = itemRepository.findAll(pageable);

        return itemPage;
    }

    @Override
    public Page<Item> findItems(int pageNumber, int pageSize, Long categoryId) {
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("createdAt").descending());
        Page<Item> itemPage = itemRepository.findByCategoryCategoryId(categoryId, pageable);

        return itemPage;
    }

    @Override
    public void updateItem(ItemDto.PatchDto patchDto) {
        //TODO: ITEM STATUS 가 WAITING 일때만 UPDATE 가능
        Item findItem = findVerifiedItem(patchDto.getItem_id());
        //TODO: MEMBER 구현 후 주석 해제
//        if(findItem.getMember().getMemberId() != item.getMember().getMemberId()) {
//            throw new GlobalException(ExceptionCode.MEMBER_MISS_MATCH);
//        }

        LocalDateTime currentTime = LocalDateTime.now();
        if(findItem.getStatus().equals(ItemStatus.WAITING) || currentTime.isBefore(findItem.getEndTime())) {
            Optional.ofNullable(patchDto.getTitle()).ifPresent(findItem::setTitle);
            Optional.ofNullable(patchDto.getContent()).ifPresent(findItem::setContent);
            //test 필요
            Optional.ofNullable(patchDto.getCategory_id()).ifPresent(categoryId -> findItem.getCategory().setCategoryId(categoryId));
            if(patchDto.getEnd_time() != null) {
                LocalDateTime endTime;

                if(patchDto.getEnd_time() < 10) {
                    endTime = findItem.getCreatedAt().plusDays(patchDto.getEnd_time());
                }
                else {
                    endTime = findItem.getCreatedAt().plusSeconds(patchDto.getEnd_time());
                }
            }
            Optional.ofNullable(patchDto.getStart_price()).ifPresent(findItem::setStartPrice);
            Optional.ofNullable(patchDto.getBid_unit()).ifPresent(findItem::setBidUnit);
            findItem.setBuyNowPrice(patchDto.getBuy_now_price());
            if(patchDto.getBuy_now_price() != null) {
                findItem.setBuyNow("Y");
            }
            else {
                findItem.setBuyNow("N");
            }
        }
    }

    @Override
    public void removeImage(Long itemId, Long memberId, List<String> deleteImageUrls) {

        //TODO: ITEM STATUS 가 WAITING 일때만 UPDATE 가능
        Item findItem = findVerifiedItem(itemId);
        //TODO: MEMBER 구현 후 주석 해제
//        if(findItem.getMember().getMemberId() != memberId) {
//            throw new GlobalException(ExceptionCode.MEMBER_MISS_MATCH);
//        }

        LocalDateTime currentTime = LocalDateTime.now();
        if(findItem.getStatus().equals(ItemStatus.WAITING) || currentTime.isBefore(findItem.getEndTime())) {
            deleteImageUrls.forEach(s3Service::deleteFileAtS3);
        }
    }

    @Override
    public void removeItem(Long itemId, Long memberId) {

        //TODO: ITEM STATUS 가 WAITING 일때만 DELETE 가능

    }


    @Override
    public Item findVerifiedItem(Long itemId) {
        return itemRepository
                .findById(itemId)
                .orElseThrow(() -> new GlobalException(ExceptionCode.ITEM_NOT_FOUND));
    }
}
