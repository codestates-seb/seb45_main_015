package com.project15.server.chat.service;

import com.project15.server.chat.dto.ChatEntryDto;
import com.project15.server.chat.dto.MessageDto;
import com.project15.server.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.project15.server.chat.entity.ChatEntry;
import com.project15.server.chat.entity.ChatRoom;
import com.project15.server.chat.entity.ChatMessage;
import com.project15.server.chat.repository.ChatEntryRepository;
import com.project15.server.chat.repository.MessageRepository;
//import com.project15.server.member.entity.Member;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatEntryRepository chatEntryRepository;
    private final MessageRepository messageRepository;

    @Transactional
    public Long createChatRoom(ChatRoom chatRoom) {

        ChatRoom saveChatRoom = chatRoomRepository.save(chatRoom);

        return saveChatRoom.getChatRoomId();
    }

    public List<ChatEntryDto> findMyChatRooms(Long memberId) {
        List<ChatEntry> findChatRooms = chatEntryRepository.findByMemberId(memberId);

        List<ChatEntryDto> response = findChatRooms.stream()
                .map(o -> new ChatEntryDto(o))
                .collect(Collectors.toList());

        log.info("ChatEntryDto : " + response.toString());

        return response;

        //return findChatRooms;
    }

//    @Transactional
//    public void deleteChatRoom(Long chatRoomId, Long memberId) {
//        ChatRoom findChatRoom = findChatRoom(chatRoomId);
//
//        ChatEntry deleteChatRoom = chatEntryRepository.findByMemberIdAndChatRoom(memberId, findChatRoom);
//
//        deleteChatRoom.setDeleteAt(LocalDateTime.now());
//    }

    public List<MessageDto> findMessages(Long chatRoomId) {
        ChatRoom findChatRoom = findChatRoom(chatRoomId);

        List<ChatMessage> findMessages = messageRepository.findByChatRoom(findChatRoom);
        List<MessageDto> response = findMessages.stream()
                .map(o -> new MessageDto(o))
                .collect(Collectors.toList());

        return response;
       //return findMessages;
    }

    public ChatRoom findChatRoom(Long chatRoomId) {
        Optional<ChatRoom> findChatRoom = chatRoomRepository.findById(chatRoomId);

        return findChatRoom.orElseThrow();
    }
}