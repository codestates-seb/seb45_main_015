package com.project15.server.member.controller;

import com.project15.server.member.dto.LoginDto;
import com.project15.server.member.dto.MemberDto;
import com.project15.server.member.dto.TokenDto;
import com.project15.server.member.jwt.JwtFilter;
import com.project15.server.member.jwt.TokenProvider;
import com.project15.server.member.service.MemberService;
import com.project15.server.member.service.CustomMemberDetailsService;
import com.project15.server.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    @Autowired
    private MemberService memberService;
    @Autowired
    private CustomMemberDetailsService customMemberDetailsService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @GetMapping("/{memberId}")
    public ResponseEntity<Member> getMemberById(@PathVariable Long memberId) {
        Member member = memberService.getEmailByMemberId(memberId);

        if (member != null) {
            return ResponseEntity.ok(member);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/signup")
    public ResponseEntity<Member> signup(
            @Valid @RequestBody MemberDto memberDto
    ) {
        return ResponseEntity.ok(memberService.signup(memberDto));
    }
    @PostMapping("/login")
    public ResponseEntity<TokenDto> authorize(@Valid @RequestBody LoginDto loginDto) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        // authenticate 메소드가 실행이 될 때 CustomUserDetailsService class의 loadUserByUsername 메소드가 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        // 해당 객체를 SecurityContextHolder에 저장하고
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // authentication 객체를 createToken 메소드를 통해서 JWT Token을 생성
        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        // response header에 jwt token에 넣어줌
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        // tokenDto를 이용해 response body에도 넣어서 리턴
        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
    }
    @PostMapping("/logout")
    public ResponseEntity<String> logoutMember(HttpServletRequest request) {
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


