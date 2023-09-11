package com.project15.server.item.entity;

import com.project15.server.audit.Auditable;
import com.project15.server.bid.entity.Bid;
import com.project15.server.category.entity.Category;
import com.project15.server.member.entity.Member;
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
    @Column(name = "item_id")
    private Long itemId;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private Member seller;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id")
    private Member buyer;

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

    public void setSeller(Long sellerId) {
        Member newSeller = new Member();
        newSeller.setMemberId(sellerId);

        this.seller = newSeller;
    }

    public void setBuyer(Member buyer) {
        this.buyer = buyer;
    }

    public void setCategory(Long categoryId) {
        Category newCategory = new Category();
        newCategory.setCategoryId(categoryId);

        this.category = newCategory;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}