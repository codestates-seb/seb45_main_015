package com.project15.server.chat.entity;

import com.project15.server.member.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatroomId;

    private Long sellerId;

    private Long buyerId;

    private String chatroomName;

    private String lastMessage;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private ChatRoomStatus status = ChatRoomStatus.ACTIVATE;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_Id")
    private Member seller;

    @OneToMany(mappedBy = "chatRoom")
    private List<ChatMessage> messages;

}