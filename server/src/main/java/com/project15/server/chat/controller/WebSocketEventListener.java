package com.project15.server.chat.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Component
@Slf4j
public class WebSocketEventListener extends TextWebSocketHandler {

    private final Set<WebSocketSession> sessions = new HashSet<>();

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        log.info("새로운 WebSocket 연결을 받았습니다.");
    }

    @Override
    protected void handleTextMessage(WebSocketSession session,
                                     TextMessage message) throws IOException {
        System.out.println(message.getPayload());

        for (WebSocketSession connectedSession : sessions) {
            connectedSession.sendMessage(message);
        }
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        log.info("WebSocket 연결이 끊겼습니다.");
    }
}