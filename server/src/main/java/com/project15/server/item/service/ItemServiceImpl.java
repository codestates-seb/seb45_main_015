package com.project15.server.item.service;

import com.project15.server.exception.ExceptionCode;
import com.project15.server.exception.GlobalException;
import com.project15.server.item.entity.Item;
import com.project15.server.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService{

    private final ItemRepository itemRepository;

    @Override
    public Item createItem(Item item) {
        verifyExistItem(item.getItemId());

        return null;
    }

    public void verifyExistItem(long itemId) {
        if(itemRepository.findById(itemId).isPresent()) {
            throw new GlobalException(ExceptionCode.ITEM_EXISTS);
        }
    }

    public Item findVerifiedItem(long itemId) {
        return itemRepository.findById(itemId).orElseThrow(() -> new GlobalException(ExceptionCode.ITEM_NOT_FOUND));
    }
}
