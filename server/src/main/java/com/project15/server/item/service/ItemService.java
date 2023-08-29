package com.project15.server.item.service;

import com.project15.server.item.entity.Item;
import org.springframework.stereotype.Service;

@Service
public interface ItemService {

    Item createItem(Item item);
}
