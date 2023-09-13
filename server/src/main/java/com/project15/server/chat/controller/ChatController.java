package com.project15.server.chat.controller;

import com.project15.server.chat.dto.ChatEntryDto;
import com.project15.server.chat.dto.ChatEntryMessageDto;
import com.project15.server.chat.dto.MessageDto;
import com.project15.server.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.project15.server.chat.dto.ChatEntryChatRoomDto;
import com.project15.server.chat.entity.ChatEntry;
import com.project15.server.chat.entity.ChatMessage;
import com.project15.server.chat.entity.ChatRoom;
import com.project15.server.chat.mapper.ChatMapper;

//import com.project15.server.member.entity.Member;
//import com.project15.server.member.service.MemberService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final ChatService chatService;
    //private final MemberService memberService;
    private final ChatMapper chatMapper;

    @PostMapping("/chat")
    public ResponseEntity postChatRoom(@RequestBody ChatEntryChatRoomDto request)
    {


        ChatRoom chatRoom = chatMapper.postDtoToChatRoom(request);

        return new ResponseEntity(chatService.createChatRoom(chatRoom), HttpStatus.OK);

    }

//    @GetMapping("/chat")
//    public ResponseEntity getChatRoom()
//    {
//        Member loginMember = memberService.findLoginMember();
//
//        log.info("loginMember : " + loginMember.getEmail());
//
//        List<ChatEntryDto> findChatRooms = chatService.findMyChatRooms(loginMember.getMemberId());
//
//        return new ResponseEntity(findChatRooms, HttpStatus.OK);
//    }

    @GetMapping("/chat/{room-id}")
    public ResponseEntity getMessage(@PathVariable("room-id") Long chatRoomId)
    {

        List<MessageDto> findMessages = chatService.findMessages(chatRoomId);

        return new ResponseEntity(findMessages, HttpStatus.OK);

    }

//    @DeleteMapping("/chat/{room-id}")
//    public void deleteChatRoom(@PathVariable("room-id") Long chatRoomId)
//    {
//        Member loginMember = memberService.findLoginMember();
//
//        chatService.deleteChatRoom(chatRoomId, loginMember.getMemberId());
//    }

}