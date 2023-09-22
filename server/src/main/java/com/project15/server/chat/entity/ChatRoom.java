package com.project15.server.chat.entity;

import com.project15.server.audit.Auditable;
import com.project15.server.item.entity.Item;
import com.project15.server.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class ChatRoom extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomId;

    @OneToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @Enumerated(EnumType.STRING)
    private ChatRoomStatus status = ChatRoomStatus.ACTIVATE;

//    @OneToOne
//    @JoinColumn(name = "delete_id")
//    private ChatRoomDelete chatRoomDelete;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private Member buyer;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Member seller;

    @OneToMany(mappedBy = "chatRoom")
    private List<ChatMessage> chatMessages = new ArrayList<>();
//
//    @OneToMany(mappedBy = "chatRoom")
//    private List<ChatEntry> chatEntryList = new ArrayList<>();

    public void setBuyer(Long buyerId) {
        Member buyer = new Member();
        buyer.setMemberId(buyerId);

        this.buyer = buyer;
    }

    public void setSeller(Long sellerId) {
        Member seller = new Member();
        seller.setMemberId(sellerId);

        this.seller = seller;
    }

    public void setItem(Long itemId) {
        Item item = new Item();
        item.setItemId(itemId);

        this.item = item;
    }
}