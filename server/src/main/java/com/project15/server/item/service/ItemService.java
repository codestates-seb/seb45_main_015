package com.project15.server.item.service;

import com.project15.server.item.entity.Item;
import com.project15.server.item.entity.ItemImage;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface ItemService {

    Item createItem(Item item, List<MultipartFile> files);

    Item createItem(Item item);

    void verifyExistItem(long itemId);

    Item findVerifiedItem(long itemId);
}
