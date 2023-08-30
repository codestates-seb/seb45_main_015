package com.project15.server.item.entity;

import com.project15.server.audit.Auditable;
import com.project15.server.member.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Item extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long itemId;

//멤버 연관관계로 인한 예외로 주석처리
//    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_id")
//    private Member member;

    @OneToMany(targetEntity = ItemImage.class, mappedBy = "item")
    private List<ItemImage> itemImages = new ArrayList<>();

    private String title;

    private String content;

    private String category;

    //createdAt과 합산하여 만료일을 계산
    private int expireDate;

    private int startPrice;

    private int bidUnit;

    private int currentPrice;

    private String buyNow;

    private int buyNowPrice;

    @Enumerated(value = EnumType.STRING)
    private ItemStatus status = ItemStatus.PROGRESSING;
//멤버 연관관계로 인한 예외로 주석처리
//    public void setMember(Member member) {
//        Member newMember = new Member();
//        newMember.setMemberId(member.getMemberId());
//
//        this.member = newMember;
//    }
}
