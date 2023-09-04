package com.project15.server.member;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Map;


@RestController
@RequestMapping("/members")
public class MemberController {

    @Autowired
    private MemberService memberService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired
    private CustomMemberDetailsService customMemberDetailsService;

    @PostMapping("/signup")
    public ResponseEntity<String> signupMember(@RequestBody MemberDto memberDto) {
        memberService.createMember(memberDto.getEmail(), memberDto.getPassword(), memberDto.getNickname());
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginMember(@RequestBody MemberDto memberDto) {
        if (memberService.authenticateMember(memberDto.getEmail(), memberDto.getPassword())) {
            return ResponseEntity.ok("로그인 성공");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutMember(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok("로그아웃 성공");
    }

    //닉네임 수정
    @PatchMapping("/change-nickname/{memberId}")
    public ResponseEntity<String> updateNickname(@PathVariable Long memberId,@RequestBody Map<String, String> requestBody) {
        String password = requestBody.get("password");
        String newNickname = requestBody.get("newNickname");
        return memberService.updateNickname(memberId, password, newNickname);
    }
    @PatchMapping("/change-password/{memberId}")
    public ResponseEntity<String> updatePassword(@PathVariable Long memberId,
                                                 @RequestBody MemberDto.PasswordChangeRequest request) {

        boolean isPasswordUpdated = memberService.updatePassword(memberId, request.getOldPassword(), request.getNewPassword());

        if (isPasswordUpdated) {
            return ResponseEntity.ok("비밀번호 변경 성공");
        } else {
            return ResponseEntity.badRequest().body("비밀번호 변경 실패");
        }
    }
}


