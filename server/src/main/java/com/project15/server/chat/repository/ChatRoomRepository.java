package com.project15.server.chat.repository;

import com.project15.server.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    List<ChatRoom> findByBuyerMemberIdOrSellerMemberId(Long buyerId, Long sellerId);

    Optional<ChatRoom> findByItemItemId(Long itemId);
}