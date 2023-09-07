package com.project15.server.bid.repository;

import com.project15.server.bid.entity.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Optional;

public interface BidRepository extends JpaRepository<Bid, Long> {
    //TODO: Member 엔티티 오류로 인한 주석처리
    //Optional<Bid> findByMemberMemberIdAndItemItemId(Long memberId, Long itemId);
}
