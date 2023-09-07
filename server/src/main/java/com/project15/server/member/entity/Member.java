package com.project15.server.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project15.server.audit.Auditable;
import com.project15.server.bid.entity.Bid;
import com.project15.server.item.entity.Item;
import com.project15.server.item.entity.ItemImage;
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
    /*@JsonIgnore
    private boolean activated;*/

   @ManyToMany
  /* @JoinTable(
            name = "authority",
            joinColumns = {@JoinColumn(name = "member_id", referencedColumnName = "memberId")},
            inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "authorityName")})*/
    private Set<Authority> authorities;



   /* @OneToMany(targetEntity = Item.class, mappedBy = "member")
    private List<Item> items = new ArrayList<>();

    @OneToMany(targetEntity = Bid.class, mappedBy = "member")
    private List<Bid> bids = new ArrayList<>();*/
}
