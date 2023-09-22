package com.project15.server.chat.controller.dto;

import com.project15.server.chat.entity.ChatRoom;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChatResponse {

    private Long chat_room_id;

    private Long item_id;

    private String item_url;

    private String item_title;

    private Long seller_id;

    private Long buyer_id;

    private String seller_nickname;

    private String buyer_nickname;

    private String seller_email;

    private String buyer_email;

    private String last_message;
}
