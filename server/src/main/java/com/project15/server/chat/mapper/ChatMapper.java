package com.project15.server.chat.mapper;

import com.project15.server.chat.controller.dto.ChatMultiResponse;
import com.project15.server.chat.controller.dto.ChatPostRequest;
import com.project15.server.chat.controller.dto.ChatResponse;
import com.project15.server.chat.entity.ChatRoom;
//import com.project15.server.member.dto.MemberDto;
import com.project15.server.item.entity.ItemImage;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ChatMapper {

    public ChatRoom postDtoToChatRoom(ChatPostRequest request) {
        if(request == null) {
            return null;
        }
        else {
            ChatRoom chatRoom = new ChatRoom();
            chatRoom.setSeller(request.getSeller_id());
            chatRoom.setBuyer(request.getBuyer_id());
            chatRoom.setItem(request.getItem_id());

            return chatRoom;
        }
    }

    public ChatResponse chatRoomToResponse(ChatRoom chatRoom) {
        if(chatRoom == null) {
            return null;
        }
        else {
            ChatResponse chatResponse = new ChatResponse();
            chatResponse.setChat_room_id(chatRoom.getChatRoomId());
            chatResponse.setItem_id(chatRoom.getItem().getItemId());

            List<ItemImage> itemImages = chatRoom.getItem().getItemImages();
            if(!itemImages.isEmpty()) {
                chatResponse.setItem_url(itemImages.get(0).getImageUrl());
            }

            chatResponse.setItem_title(chatRoom.getItem().getTitle());
            chatResponse.setSeller_id(chatRoom.getSeller().getMemberId());
            chatResponse.setBuyer_id(chatRoom.getBuyer().getMemberId());
            chatResponse.setSeller_nickname(chatRoom.getSeller().getNickname());
            chatResponse.setBuyer_nickname(chatRoom.getBuyer().getNickname());
            chatResponse.setSeller_email(chatRoom.getSeller().getEmail());
            chatResponse.setBuyer_email(chatRoom.getBuyer().getEmail());

            //TODO: 마지막 메세지(last_message) 추가

            return chatResponse;
        }
    }

    public ChatMultiResponse chatRoomListToMultiResponse(List<ChatRoom> chatRooms) {
        if(chatRooms == null) {
            return null;
        }
        else {
            List<ChatResponse> chatResponses = chatRooms.stream().map(this::chatRoomToResponse).collect(Collectors.toList());

            ChatMultiResponse chatMultiResponse = new ChatMultiResponse();
            chatMultiResponse.setChat_rooms(chatResponses);

            return chatMultiResponse;
        }
    }
}