package com.project15.server.chat.dto;

import com.project15.server.chat.entity.ChatMessage;
import lombok.Getter;

@Getter
public class MessageDto {

    private Long messageId;
    private Long senderId;
    private String message;

   // private LocalDateTime createdAt = LocalDateTime.now();

    public MessageDto(ChatMessage o) {
        this.messageId = o.getMessageId();
        this.senderId = o.getSenderId();
        this.message = o.getMessage();
        //this.createdAt = o.getCreatedAt();
    }

}
