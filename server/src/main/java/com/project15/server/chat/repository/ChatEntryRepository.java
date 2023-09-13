package com.project15.server.chat.repository;

import com.project15.server.chat.entity.ChatEntry;
import com.project15.server.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatEntryRepository extends JpaRepository<ChatEntry, Long> {

    List<ChatEntry> findByMemberId(Long memberId); //Optional<ChatEntry>

    ChatEntry findByMemberIdAndChatRoom(Long memberId, ChatRoom chatRoom);
}
