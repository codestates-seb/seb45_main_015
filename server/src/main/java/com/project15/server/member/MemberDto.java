package com.project15.server.member;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDto {
    private Long memberId;
    private String email;
    private String password;
    private String nickname;
    private String role;

   /*private String item;*/
   @Getter
   @Setter
   public static class PasswordChangeRequest {
       private String oldPassword;
       private String newPassword;
   }
}
