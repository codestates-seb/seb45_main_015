package com.project15.server.chat.controller;

import com.project15.server.chat.controller.dto.ChatMultiResponse;
import com.project15.server.chat.controller.dto.ChatPostRequest;
import com.project15.server.chat.controller.dto.ChatResponse;
import com.project15.server.chat.dto.MessageDto;
import com.project15.server.chat.service.ChatService;
import com.project15.server.member.entity.Member;
import com.project15.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    private final MemberService memberService;
    private final ChatMapper chatMapper;

    @PostMapping("/chat")
    public ResponseEntity postChatRoom(@RequestBody ChatPostRequest request)
    {
        ChatRoom chatRoom = chatMapper.postDtoToChatRoom(request);
        ChatRoom savedChatRoom = chatService.createChatRoom(chatRoom);
        ChatResponse chatResponse = chatMapper.chatRoomToResponse(savedChatRoom);
        return new ResponseEntity<>(chatResponse, HttpStatus.OK);

    }

    @GetMapping("/chat")
    public ResponseEntity getChatRoom(@RequestParam("member_id") Long memberId)
    {
        Member loginMember = memberService.findByMemberId(memberId);

        log.info("loginMember : " + loginMember.getEmail());

        List<ChatRoom> findChatRooms = chatService.findMyChatRooms(loginMember.getMemberId());

        ChatMultiResponse chatMultiResponse = chatMapper.chatRoomListToMultiResponse(findChatRooms);

        return new ResponseEntity<>(chatMultiResponse, HttpStatus.OK);
    }

    @GetMapping("/chat/{room-id}")
    public ResponseEntity getMessage(@PathVariable("room-id") Long chatRoomId)
    {

        List<MessageDto> findMessages = chatService.findMessages(chatRoomId);

        return new ResponseEntity<>(findMessages, HttpStatus.OK);

    }

//    @DeleteMapping("/chat/{room-id}")
//    public void deleteChatRoom(@PathVariable("room-id") Long chatRoomId)
//    {
//        Member loginMember = memberService.findLoggingMember();
//
//        chatService.deleteChatRoom(chatRoomId, loginMember.getMemberId());
//    }

}