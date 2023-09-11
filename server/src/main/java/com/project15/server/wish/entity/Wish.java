package com.project15.server.wish.entity;

import com.project15.server.audit.Auditable;
import com.project15.server.item.entity.Item;
import com.project15.server.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Wish extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wishId;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(targetEntity = Item.class)
    @JoinColumn(name = "item_id")
    private Item item;

    public void setMember(Long memberId) {
        Member newMember = new Member();
        newMember.setMemberId(memberId);

        this.member = newMember;
    }

    public void setItem(Long itemId) {
        Item newItem = new Item();
        newItem.setItemId(itemId);

        this.item = newItem;
    }
}