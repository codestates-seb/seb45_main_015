package com.project15.server.item.service;

import com.project15.server.item.entity.Item;
import com.project15.server.item.entity.ItemImage;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface ItemService {

    void createImage(Long itemId, List<MultipartFile> images);

    Item createItem(Item item);

    Item findVerifiedItem(Long itemId);
}
