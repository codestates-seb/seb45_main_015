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

    ItemDto.ResponseDto createItem(Item item, int endTime);

    ItemDto.ResponseDto findItem(Long itemId, Long watcherId);

    ItemDto.MultiResponseDto findItems(int pageNumber, int pageSize, Long watcherId);

    ItemDto.MultiResponseDto findItemsByCategory(int pageNumber, int pageSize, Long categoryId, Long watcherId);

    ItemDto.MultiResponseDto findItemsByStatus(int pageNumber, int pageSize, String status, Long sellerId);

    ItemDto.MultiResponseDto findItemsByKeyword(int pageNumber, int pageSize, String keyword, Long watcherId);

    ItemDto.ResponseDto updateItem(ItemDto.PatchDto patchDto, Long itemId);

    void removeImage(Long itemId, Long memberId, List<String> deleteImageUrls);

    void removeItem(Long itemId, Long memberId);

    Item findVerifiedItem(Long itemId);

    ItemImage findVerifiedItemImage(String imageUrl);
}
