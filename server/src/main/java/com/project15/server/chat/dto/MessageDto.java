package com.project15.server.chat.dto;

import com.project15.server.chat.entity.ChatMessage;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MessageDto {

    private Long messageId;
    private Long senderId;
    private String content;
   // private LocalDateTime createdAt = LocalDateTime.now();

    public MessageDto(ChatMessage o) {
        this.messageId = o.getMessageId();
        this.senderId = o.getSenderId();
        this.content = o.getContent();
        //this.createdAt = o.getCreatedAt();
    }

}
