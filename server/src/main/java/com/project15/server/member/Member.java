package com.project15.server.member;

import com.project15.server.audit.Auditable;
import com.project15.server.item.entity.Item;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

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

   /* @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item; */
}
