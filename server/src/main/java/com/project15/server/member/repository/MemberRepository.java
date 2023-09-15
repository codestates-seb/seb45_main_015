package com.project15.server.member.repository;

import com.project15.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Optional<Member> findByNickname(String nickname);

    Optional<Member> findByMemberId(Long memberId);

    Optional<Member> findOneWithAuthoritiesByEmail(String email);

}

