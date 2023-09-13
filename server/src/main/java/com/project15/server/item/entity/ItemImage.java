package com.project15.server.item.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ItemImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemImageId;

    @ManyToOne(targetEntity = Item.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    private String imageName;

    private String imageUrl;

    private String imageType;

    public void setItem(Long itemId) {
        Item newItem = new Item();
        newItem.setItemId(itemId);

        this.item = newItem;
    }
}
