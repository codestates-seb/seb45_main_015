package com.project15.server.item.entity;

import com.project15.server.audit.Auditable;
import com.project15.server.itemImage.entity.ItemImage;
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

//    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
//    @JoinColumn(name = "member_id")
//    private Member member;

    @OneToMany(targetEntity = ItemImage.class, mappedBy = "item")
    private List<ItemImage> itemImages = new ArrayList<>();

    private String title;

    private String content;

    private String category;

    private String expireDate;

    private long startPrice;

    private long bidUnit;

    private long currentPrice;

    private boolean buyNow;

    private long buyNowPrice;

    @Enumerated(value = EnumType.STRING)
    private ItemStatus status = ItemStatus.PROGRESSING;
}
