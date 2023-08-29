package com.project15.server.chat.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long memberId;

    private Long chatmessageId;

    private String message;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private ChatRoomStatus status = ChatRoomStatus.ACTIVATE;

    @ManyToOne
    @JoinColumn(name = "chat_room_Id")
    private ChatRoom chatroom;

}
