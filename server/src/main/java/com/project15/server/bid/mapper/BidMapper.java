package com.project15.server.bid.mapper;

import com.project15.server.bid.dto.BidDto;
import com.project15.server.bid.entity.Bid;
import com.project15.server.item.entity.Item;
import org.springframework.stereotype.Component;

@Component
public class BidMapper {

    public Bid postToBid(BidDto.PostDto postDto) {
        if(postDto == null) {
            return null;
        }
        else {
            Bid bid = new Bid();
            bid.setItem(postDto.getItem_id());

            bid.setBuyer(postDto.getBuyer_id());

            bid.setBidPrice(postDto.getBid_price());

            return bid;
        }
    }
}
