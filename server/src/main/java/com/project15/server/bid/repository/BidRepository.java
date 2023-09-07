package com.project15.server.bid.repository;

import com.project15.server.bid.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Optional;

public interface BidRepository extends JpaRepository<Bid, Long> {

    Optional<Bid> findByBuyerMemberIdAndItemItemId(Long buyerId, Long itemId);
}
