package com.project15.server.item.entity;

import com.project15.server.audit.Auditable;
import com.project15.server.category.entity.Category;
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
    private Long itemId;

//멤버 연관관계로 인한 예외로 주석처리
//    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_id")
//    private Member member;

    @OneToMany(targetEntity = ItemImage.class, mappedBy = "item")
    private List<ItemImage> itemImages = new ArrayList<>();

    @OneToOne(targetEntity = Category.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    private String title;

    private String content;

    //createdAt과 합산하여 만료일을 계산
    private int auctionTime;

    private int startPrice;

    private int bidUnit;

    private int currentPrice;

    private String buyNow;

    private Integer buyNowPrice;

    @Enumerated(value = EnumType.STRING)
    private ItemStatus status = ItemStatus.WAITING;
//멤버 연관관계로 인한 예외로 주석처리
//    public void setMember(Member member) {
//        Member newMember = new Member();
//        newMember.setMemberId(member.getMemberId());
//
//        this.member = newMember;
//    }

    public void setCategory(Category category) {
        Category newCategory = new Category();
        newCategory.setCategoryId(category.getCategoryId());

        this.category = newCategory;
    }
}
