package com.project15.server.chat.mapper;

import com.project15.server.chat.controller.dto.ChatPostRequest;
import com.project15.server.chat.dto.ChatEntryChatRoomDto;
import com.project15.server.chat.entity.ChatRoom;
//import com.project15.server.member.dto.MemberDto;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface ChatMapper {

    ChatRoom postDtoToChatRoom(ChatPostRequest request);
}