package com.project15.server.item.service;

import com.project15.server.item.dto.ItemDto;
import com.project15.server.item.entity.Item;
import com.project15.server.item.entity.ItemImage;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface ItemService {

    ItemDto.ResponseDto createImage(Long itemId, List<MultipartFile> images);

    void createItem(Item item, int endTime);

    ItemDto.ResponseDto findItem(Long itemId);

    Page<Item> findItems(int pageNumber, int pageSize);

    Page<Item> findItems(int pageNumber, int pageSize, Long categoryId);

    Page<Item> findItems(int pageNumber, int pageSize, String status, Long sellerId);

    ItemDto.ResponseDto updateItem(ItemDto.PatchDto patchDto, Long itemId);

    void removeImage(Long itemId, Long memberId, List<String> deleteImageUrls);

    void removeItem(Long itemId, Long memberId);

    Item findVerifiedItem(Long itemId);

    ItemImage findVerifiedItemImage(String imageUrl);
}
