package com.project15.server.category.entity;

import com.project15.server.audit.Auditable;
import com.project15.server.item.entity.Item;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Category extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @OneToMany(targetEntity = Item.class, mappedBy = "category")
    private List<Item> items = new ArrayList<>();

    private String name;
}
