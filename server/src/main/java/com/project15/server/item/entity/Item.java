package com.project15.server.item.entity;

import com.project15.server.audit.Auditable;
import com.project15.server.bid.entity.Bid;
import com.project15.server.category.entity.Category;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.repository.Lock;

import javax.persistence.*;
import java.time.LocalDateTime;
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

    @ManyToOne(targetEntity = Category.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(targetEntity = Bid.class, mappedBy = "item")
    private List<Bid> bids = new ArrayList<>();

    private String title;

    @Lob
    private String content;

    //createdAt과 합산하여 만료일을 계산
    private LocalDateTime endTime;

    private int startPrice;

    private int bidUnit;

    private int currentPrice;

    private Integer buyNowPrice;

    @Enumerated(value = EnumType.STRING)
    private ItemStatus status = ItemStatus.WAITING;

//TODO: MEMBER 구현 후 주석 해제
//    public void setMember(Long memberId) {
//        Member newMember = new Member();
//        newMember.setMemberId(memberId);
//
//        this.member = newMember;
//    }
    public void setCategory(Long categoryId) {
        Category newCategory = new Category();
        newCategory.setCategoryId(categoryId);

        this.category = newCategory;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}