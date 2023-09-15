package com.project15.server.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class MemberDto {

    private Long memberId;
    @NotNull
    private String email;
    @NotNull
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    @NotNull
    private String nickname;
    private String role;

   @Getter
   @Setter
   public static class PasswordChangeRequest {
       private String oldPassword;
       private String newPassword;
   }
}
