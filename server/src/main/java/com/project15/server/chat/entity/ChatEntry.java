package com.project15.server.chat.entity;

import com.project15.server.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter @Setter
public class ChatEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long chatEntryId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;
    //private LocalDateTime deleteAt;


    @ManyToOne
    @JoinColumn(name = "chatroom_id")
    private ChatRoom chatRoom;
}
