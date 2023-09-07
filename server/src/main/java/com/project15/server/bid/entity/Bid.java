package com.project15.server.bid.entity;

import com.project15.server.audit.Auditable;
import com.project15.server.item.entity.Item;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
public class Bid extends Auditable implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bidId;

//    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_id")
//    private Member member;

    @ManyToOne(targetEntity = Item.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    private int bidPrice;

//    public void setMember(Long memberId) {
//        Member newMember = new Member();
//        newMember.setMemberId(memberId);
//
//        this.member = newMember;
//    }

    public void setItem(Long itemId) {
        Item newItem = new Item();
        newItem.setItemId(itemId);

        this.item = newItem;
    }
}
