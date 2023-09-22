package com.project15.server.chat.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChatPostRequest {
    private Long item_id;

    private Long seller_id;

    private Long buyer_id;
}