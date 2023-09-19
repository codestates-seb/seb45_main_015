package com.project15.server.member.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class GuestUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long GuestId;

    private String username;
    private String password;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MemberRole Role;

}
