package com.project15.server.chat.dto;

import com.project15.server.chat.entity.ChatEntry;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ChatEntryChatRoomDto {
        //    private Long chatEntryId;
        private String name;
        private Long memberId;
        //private LocalDateTime deletedAt;

        public ChatEntryChatRoomDto(ChatEntry o) {
//        this.chatEntryId = o.getChatEntryId();
            this.name = o.getMemberId().getNickname();
            this.memberId = o.getMemberId().getMemberId();
           // this.deletedAt = o.getDeleteAt();
        }
}