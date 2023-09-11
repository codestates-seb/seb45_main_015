package com.project15.server.wish.repository;

import com.project15.server.wish.entity.Wish;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WishRepository extends JpaRepository<Wish, Long> {

    Optional<Wish> findByMemberMemberIdAndItemItemId(Long memberId, Long itemId);

    Page<Wish> findByMemberMemberId(Long memberId, Pageable pageable);
}
