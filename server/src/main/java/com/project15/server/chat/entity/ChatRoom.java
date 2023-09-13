package com.project15.server.chat.entity;

import com.project15.server.member.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomId;

//    private Long buyerId;
    

    private Long productId;

    @Enumerated(EnumType.STRING)
    private ChatRoomStatus status = ChatRoomStatus.ACTIVATE;

   // private LocalDateTime createdAt = LocalDateTime.now();

//    @OneToOne
//    @JoinColumn(name = "delete_id")
//    private ChatRoomDelete chatRoomDelete;

//    @ManyToOne
//    @JoinColumn(name = "member_id")
//    private Member seller;

    @OneToMany(mappedBy = "chatRoom")

    private List<ChatMessage> messages = new ArrayList<>();

    @OneToMany(mappedBy = "chatRoom")

    private List<ChatEntry> chatEntryList = new ArrayList<>();

}