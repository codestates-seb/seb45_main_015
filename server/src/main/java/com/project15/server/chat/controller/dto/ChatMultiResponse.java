package com.project15.server.chat.controller.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChatMultiResponse {

    private List<ChatResponse> chat_rooms;
}
