package com.project15.server.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project15.server.audit.Auditable;
import com.project15.server.bid.entity.Bid;
import com.project15.server.item.entity.Item;
import com.project15.server.item.entity.ItemImage;
import com.project15.server.wish.entity.Wish;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member extends Auditable {
    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String email;
    @JsonIgnore
    private String password;
    private String nickname;
    private String role;


   @ManyToMany
    private Set<Authority> authorities;


    @OneToMany(targetEntity = Item.class, mappedBy = "seller")
    private List<Item> sellItems = new ArrayList<>();

    @OneToMany(targetEntity = Item.class, mappedBy = "buyer")
    private List<Item> buyItems = new ArrayList<>();

    @OneToMany(targetEntity = Bid.class, mappedBy = "buyer")
    private List<Bid> bids = new ArrayList<>();

    @OneToMany(targetEntity = Wish.class, mappedBy = "member")
    private List<Wish> wishes = new ArrayList<>();
}
