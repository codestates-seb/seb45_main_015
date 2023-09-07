package com.project15.server.bid.entity;

import com.project15.server.audit.Auditable;
import com.project15.server.item.entity.Item;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Bid extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bidId;

//    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_id")
//    private Member member;

    @ManyToOne(targetEntity = Item.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    private long bidPrice;

//    public void setMember(Member member) {
//        Member newMember = new Member();
//        newMember.setMemberId(member.getMemberId());
//
//        this.member = newMember;
//    }

    public void setItem(Item item) {
        Item newItem = new Item();
        newItem.setItemId(item.getItemId());

        this.item = newItem;
    }
}
