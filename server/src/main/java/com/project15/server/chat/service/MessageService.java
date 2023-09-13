package com.project15.server.chat.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.project15.server.chat.entity.ChatMessage;
import com.project15.server.chat.repository.MessageRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class MessageService {

    private final MessageRepository messageRepository;

    @Transactional
    public Long saveMessage(ChatMessage chatMessage) {
        ChatMessage saveMessage = messageRepository.save(chatMessage);

        return saveMessage.getMessageId();
    }
}