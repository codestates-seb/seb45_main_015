package com.project15.server.chat.controller;

import com.project15.server.chat.dto.ChatEntryMessageDto;
import com.project15.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.project15.server.chat.entity.ChatMessage;
import com.project15.server.chat.entity.ChatRoom;
import com.project15.server.chat.service.ChatService;
import com.project15.server.chat.service.MessageService;

//import com.project15.server.member.entity.Member;
//import com.project15.server.member.service.MemberService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MessageController {

    private final MessageService messageService;
    private final MemberService memberService;
    private final ChatService chatService;

    @MessageMapping("/chat/{room-id}")
    @SendTo("/topic/chat/{room-id}")
    public ResponseEntity sendMessage(@DestinationVariable("room-id") Long roomId, @RequestBody ChatEntryMessageDto request) {

        ChatRoom findChatRoom = chatService.findChatRoom(roomId);

        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setMessage(request.getMessage());
        chatMessage.setSenderId(1L);
        chatMessage.setChatRoom(findChatRoom);

        messageService.saveMessage(chatMessage);

        return new ResponseEntity(chatMessage, HttpStatus.OK);
    }

}