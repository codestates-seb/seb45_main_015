package com.project15.server.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LogoutDto {
    private String token;
    private Long member_Id;
}
