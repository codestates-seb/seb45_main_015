package com.project15.server.bid.entity;

import com.project15.server.audit.Auditable;
import com.project15.server.item.entity.Item;
import com.project15.server.member.entity.Member;
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

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id")
    private Member buyer;

    @ManyToOne(targetEntity = Item.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    private int bidPrice;

    public void setBuyer(Long buyerId) {
        Member newBuyer = new Member();
        newBuyer.setMemberId(buyerId);

        this.buyer = newBuyer;
    }

    public void setBuyer(Member buyer) {
        this.buyer = buyer;
    }

    public void setItem(Long itemId) {
        Item newItem = new Item();
        newItem.setItemId(itemId);

        this.item = newItem;
    }
}
