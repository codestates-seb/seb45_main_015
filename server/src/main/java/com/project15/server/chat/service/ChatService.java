package com.project15.server.chat.service;

import com.project15.server.chat.dto.MessageDto;
import com.project15.server.chat.repository.ChatRoomRepository;
import com.project15.server.exception.ExceptionCode;
import com.project15.server.exception.GlobalException;
import com.project15.server.item.entity.Item;
import com.project15.server.item.service.ItemServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.project15.server.chat.entity.ChatRoom;
import com.project15.server.chat.entity.ChatMessage;
import com.project15.server.chat.repository.MessageRepository;
//import com.project15.server.member.entity.Member;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final MessageRepository messageRepository;

    private final ItemServiceImpl itemService;

    public ChatRoom createChatRoom(ChatRoom chatRoom) {
        //item검증
        Item findItem = itemService.findVerifiedItem(chatRoom.getItem().getItemId());

        //seller와 buyer 검증
        if(!findItem.getSeller().getMemberId().equals(chatRoom.getSeller().getMemberId())) {
            throw new GlobalException(ExceptionCode.SELLER_MISS_MATCH);
        }
        if(!findItem.getBuyer().getMemberId().equals(chatRoom.getBuyer().getMemberId())) {
            throw new GlobalException(ExceptionCode.SELLER_OR_BUYER_MISS_MATCH);
        }

        //존재하는 채팅방인지 확인
        verifyExistChatRoom(chatRoom.getItem().getItemId());

        ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);

        return savedChatRoom;
    }

    public List<ChatRoom> findMyChatRooms(Long memberId) {

        List<ChatRoom> findChatRooms = chatRoomRepository.findByBuyerMemberIdOrSellerMemberId(memberId, memberId);

        return findChatRooms;
    }

//    public void deleteChatRoom(Long chatRoomId, Long memberId) {
//        ChatRoom findChatRoom = findChatRoom(chatRoomId);
//
//        ChatEntry deleteChatRoom = chatEntryRepository.findByMemberIdAndChatRoom(memberId, findChatRoom);
//
//        deleteChatRoom.setDeleteAt(LocalDateTime.now());
//    }

    public List<MessageDto> findMessages(Long chatRoomId) {
        ChatRoom findChatRoom = findChatRoom(chatRoomId);

        List<ChatMessage> findMessages = messageRepository.findByChatRoomChatRoomId(findChatRoom.getChatRoomId());

        return null;
    }

    public ChatRoom findChatRoom(Long chatRoomId) {
        Optional<ChatRoom> findChatRoom = chatRoomRepository.findById(chatRoomId);

        return findChatRoom.orElseThrow();
    }

    private void verifyExistChatRoom(Long itemId) {
        if(chatRoomRepository.findByItemItemId(itemId).isPresent()) {
            throw new GlobalException(ExceptionCode.CHAT_ROOM_EXISTS);
        }
    }
}