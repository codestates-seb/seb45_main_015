//package com.project15.server.chat.controller;
//
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.context.event.EventListener;
//import org.springframework.stereotype.Component;
//import org.springframework.web.socket.messaging.SessionConnectedEvent;
//import org.springframework.web.socket.messaging.SessionDisconnectEvent;
//
//@Component
//@Slf4j
//public class WebSocketEventListener {
//
//    @EventListener
//    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
//        log.info("새로운 WebSocket 연결을 받았습니다.");
//    }
//
//    @EventListener
//    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
//        log.info("WebSocket 연결이 끊겼습니다.");
//    }
//}