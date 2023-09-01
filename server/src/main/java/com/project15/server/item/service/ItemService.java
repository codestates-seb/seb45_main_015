package com.project15.server.item.service;

import com.project15.server.item.entity.Item;
import com.project15.server.item.entity.ItemImage;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface ItemService {

    void createImage(Long itemId, List<MultipartFile> files, List<String> urlList);

    Item createItem(Item item);

    void verifyExistItem(Long itemId);

    Item findVerifiedItem(Long itemId);
}
