package com.project15.server.member;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;



@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<String> signupMember(@RequestBody Member member) {
        memberService.signupMember(member.getEmail(), member.getPassword(), member.getNickname());
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginMember(@RequestBody Member member) {
        if (memberService.authenticateUser(member.getEmail(), member.getPassword())) {
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
    @PostMapping("/update")
    public ResponseEntity<String> updateMember(@RequestBody Member request) {
        Member existingMember = memberService.getUserByEmail(request.getEmail());

        if (existingMember == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        }
        existingMember.setPassword(passwordEncoder.encode(request.getPassword()));
        existingMember.setNickname(request.getNickname());

        memberService.saveMember(existingMember);

        return ResponseEntity.ok("회원 정보 수정 성공");
    }
}