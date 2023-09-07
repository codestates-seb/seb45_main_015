package com.project15.server.rating;

import com.project15.server.audit.Auditable;
import com.project15.server.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Rating extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ratingId;

    private Long itemId;
   /* @OneToOne
    @JoinColumn(name = "item_id")
    private Item item; */

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Member seller;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private Member buyer;

    private int star;
}
