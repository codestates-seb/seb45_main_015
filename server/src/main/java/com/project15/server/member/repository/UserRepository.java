package com.project15.server.member.repository;

import com.project15.server.member.entity.GuestUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<GuestUser, Long> {

}