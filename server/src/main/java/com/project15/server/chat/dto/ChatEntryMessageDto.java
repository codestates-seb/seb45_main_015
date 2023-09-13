package com.project15.server.chat.dto;

import com.project15.server.chat.entity.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class ChatEntryMessageDto {
        private Long messageId;
        private String content;
       // private LocalDateTime createdAt;

        public ChatEntryMessageDto(ChatMessage o) {
            this.messageId = o.getMessageId();
            this.content = o.getContent();
            //this.createdAt = o.getCreatedAt();
        }
}