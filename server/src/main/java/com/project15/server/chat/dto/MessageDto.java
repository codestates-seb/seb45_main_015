package com.project15.server.chat.dto;

import com.project15.server.chat.entity.ChatMessage;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDto {

    private Long messageId;
    private Long senderId;
    private String message;
}
