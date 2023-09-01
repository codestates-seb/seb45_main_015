package com.project15.server.item.service;

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

    private final ItemMapper itemMapper;

    private final ItemRepository itemRepository;

    private final ItemImageRepository itemImageRepository;

    private final S3ServiceImpl s3Service;

    @Override
    public Item createItem(Item item, List<MultipartFile> files) {
        verifyExistItem(item.getItemId());
        Item savedItem = itemRepository.save(item);

//S3 업로드 방지 및 다른 로컬에서 환경변수 미설정으로 인한 예외발생을 방지하기 위해 주석처리
        //file(image)을 S3에 저장하면서 저장된 주소(URL)를 생성
//        List<String> urlList = files.stream().map(s3Service::uploadFileToS3).collect(Collectors.toList());
//
//        List<ItemImage> itemImages = new ArrayList<>();
//
//        itemImages = files.stream()
//                .map(file -> itemMapper.fileToItemImage(file, savedItem, urlList))
//                .collect(Collectors.toList());
//
//        itemImages = itemImages.stream().map(itemImageRepository::save).collect(Collectors.toList());
//
//        savedItem.setItemImages(itemImages);

        return savedItem;
    }

    //요청에서 files(images)가 없을 경우
    @Override
    public Item createItem(Item item) {
        verifyExistItem(item.getItemId());
        Item savedItem = itemRepository.save(item);

        return savedItem;
    }

    @Override
    public void verifyExistItem(long itemId) {
        if(itemRepository.findById(itemId).isPresent()) {
            throw new GlobalException(ExceptionCode.ITEM_EXISTS);
        }
    }

    @Override
    public Item findVerifiedItem(long itemId) {
        return itemRepository.findById(itemId).orElseThrow(() -> new GlobalException(ExceptionCode.ITEM_NOT_FOUND));
    }
}
