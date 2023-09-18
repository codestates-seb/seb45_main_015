package com.project15.server.rating.entity;

import com.project15.server.audit.Auditable;
import com.project15.server.item.entity.Item;
import com.project15.server.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class StarRating extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long starRatingId;

    @OneToOne(targetEntity = Item.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Member seller;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private Member buyer;

    private int star;

    public void setItem(Long itemId) {
        Item newItem = new Item();
        newItem.setItemId(itemId);
        this.item = newItem;
    }

    public void setSeller(Long sellerId) {
        Member newSeller = new Member();
        newSeller.setMemberId(sellerId);
        this.seller = newSeller;
    }

    public void setBuyer(Long buyerId) {
        Member newBuyer = new Member();
        newBuyer.setMemberId(buyerId);
        this.buyer = newBuyer;
    }
}
