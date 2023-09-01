package com.project15.server.bid.mapper;

import com.project15.server.bid.dto.BidDto;
import com.project15.server.bid.entity.Bid;
import com.project15.server.item.entity.Item;
import com.project15.server.member.Member;
import org.springframework.stereotype.Component;

@Component
public class BidMapper {

    public Bid postToBid(BidDto.PostDto postDto) {
        if(postDto == null) {
            return null;
        }
        else {
            Bid bid = new Bid();

            Item item = new Item();
            item.setItemId(postDto.getItem_id());
            bid.setItem(item);

//            Member member = new Member();
//            member.setMemberId(postDto.getMember_id());
//            bid.setMember(member);

            bid.setBidPrice(postDto.getBid_price());

            return bid;
        }
    }
}
