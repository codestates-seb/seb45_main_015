package com.project15.server.member.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum MemberProvider {

    LOCAL,
    KAKAO,
    NAVER,
    GOOGLE
}
