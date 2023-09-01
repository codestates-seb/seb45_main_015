package com.project15.server.item.service;

import com.project15.server.category.entity.Category;
import com.project15.server.category.repository.CategoryRepository;
import com.project15.server.category.service.CategoryService;
import com.project15.server.category.service.CategoryServiceImpl;
import com.project15.server.exception.ExceptionCode;
import com.project15.server.exception.GlobalException;
import com.project15.server.item.entity.Item;
import com.project15.server.item.mapper.ItemMapper;
import com.project15.server.item.repository.ItemImageRepository;
import com.project15.server.item.repository.ItemRepository;
import com.project15.server.item.entity.ItemImage;
import com.project15.server.s3.service.S3ServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
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
        List<String> urlList = images.stream().map(s3Service::uploadFileToS3).collect(Collectors.toList());

        List<ItemImage> itemImages = images.stream()
                .map(image -> itemMapper.fileToItemImage(image, itemId, urlList))
                .collect(Collectors.toList());

        itemImages.forEach(itemImageRepository::save);
    }

    @Override
    public Item createItem(Item item) {
        Item savedItem = itemRepository.save(item);

        return savedItem;
    }

    @Override
    public Item findVerifiedItem(Long itemId) {
        return itemRepository.findById(itemId).orElseThrow(() -> new GlobalException(ExceptionCode.ITEM_NOT_FOUND));
    }
}
