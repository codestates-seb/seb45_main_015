package com.project15.server.chat.dto;

import com.project15.server.chat.entity.ChatEntry;
import com.project15.server.item.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Slf4j
@NoArgsConstructor
@AllArgsConstructor
public class ChatEntryDto {
    private Long chatRoomId;
    private Long chatEntryId;
    private Long memberId;
    private Item itemId;
    //private LocalDateTime deleteAt;
    private ChatEntryChatRoomDto chatRoom;
    private ChatEntryMessageDto message;

    public ChatEntryDto(ChatEntry chatEntry) {
        this.chatRoomId = chatEntry.getChatRoom().getChatRoomId();
        this.itemId = chatEntry.getChatRoom().getItemId();


        this.chatEntryId = chatEntry.getChatEntryId();
        this.memberId = chatEntry.getMemberId().getMemberId();

//        this.deleteAt = chatEntry.getDeleteAt();

        this.chatRoom = chatEntry.getChatRoom().getChatEntryList().stream()
                .map(o -> new ChatEntryChatRoomDto(o))
                .filter(o -> o.getMemberId() != memberId)
                .collect(Collectors.toList()).get(0);

        List<ChatEntryMessageDto> messages = chatEntry.getChatRoom().getMessages().stream()
                .map(o -> new ChatEntryMessageDto(o))
                .collect(Collectors.toList());

        if (!messages.isEmpty()) {
            this.message = messages.get(messages.size() - 1);
        }

    }
}