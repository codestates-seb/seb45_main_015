package com.project15.server.item.mapper;

import com.project15.server.item.dto.ItemDto;
import com.project15.server.item.entity.Item;
import org.springframework.stereotype.Component;

@Component
public class ItemMapper {

    public Item postDtoToItem(ItemDto.PostDto postDto) {
        if(postDto == null) {
            return null;
        }
        else {
            Item item = new Item();
            item.setTitle(postDto.getTitle());
            item.setContent(postDto.getContent());
            item.setCategory(postDto.getCategory());
            item.setExpireDate(postDto.getExpire_date().toString());
            item.setStartPrice(postDto.getStart_price());
            item.setBidUnit(postDto.getBid_unit());
            item.setBuyNow(postDto.isBuy_now());
            item.setBuyNowPrice(postDto.getBuy_now_price());

            return item;
        }
    }
}
