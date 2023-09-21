package com.project15.server.member.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MemberRole {
    GUEST("ROLE_GUEST"), USER("ROLE_USER"), SOCIAL("ROLE_SOCIAL");
    private final String key;
}
