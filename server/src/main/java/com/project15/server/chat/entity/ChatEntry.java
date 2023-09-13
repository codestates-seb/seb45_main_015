package com.project15.server.chat.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter @Setter
public class ChatEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long chatEntryId;

    private Long memberId;

    //private LocalDateTime deleteAt;


    @ManyToOne
    @JoinColumn(name = "chat_room_id")

    private ChatRoom chatRoom;
}
