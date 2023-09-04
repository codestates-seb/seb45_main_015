package com.project15.server.member;

import com.project15.server.audit.Auditable;
import com.project15.server.bid.entity.Bid;
import com.project15.server.item.entity.Item;
import com.project15.server.item.entity.ItemImage;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String email;
    private String password;
    private String nickname;
    private String role;

   /* @OneToMany(targetEntity = Item.class, mappedBy = "member")
    private List<Item> items = new ArrayList<>();

    @OneToMany(targetEntity = Bid.class, mappedBy = "member")
    private List<Bid> bids = new ArrayList<>();*/
}
