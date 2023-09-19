package com.project15.server.member.controller;

import com.project15.server.member.dto.LoginDto;
import com.project15.server.member.dto.LogoutDto;
import com.project15.server.member.dto.MemberDto;
import com.project15.server.member.dto.TokenDto;
import com.project15.server.member.jwt.JwtFilter;
import com.project15.server.member.jwt.TokenProvider;
import com.project15.server.member.repository.TokenBlacklistRepository;
import com.project15.server.member.service.MemberService;
import com.project15.server.member.entity.Member;
import com.project15.server.member.service.PasswordResetException;
import com.project15.server.member.service.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Map;
import java.util.Optional;


@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenBlacklistRepository tokenBlacklistRepository;

    @GetMapping("/{member-id}")
    public ResponseEntity<Member> getMemberById(@PathVariable("member-id") Long memberId) {
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

        Optional<Member> optionalMember = Optional.ofNullable(memberService.findByEmail(loginDto.getEmail()));
        Member member = null;
        if (optionalMember.isPresent()) {
            member = optionalMember.get();
        }
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.createToken(authentication, member);

        HttpHeaders httpHeaders = new HttpHeaders();

        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
    }
    @PostMapping("/logout/{member-id}")
    public void logout(@PathVariable("member-id") Long memberId, @RequestBody LogoutDto requestDto) {
        String token = requestDto.getToken();
        tokenBlacklistRepository.save(token, memberId);
    }
    @PatchMapping("/change-nickname/{member-id}")
    public ResponseEntity<String> updateNickname(@PathVariable("member-id") Long memberId, @RequestBody Map<String, String> requestBody) {
        String newNickname = requestBody.get("newNickname");
        return memberService.updateNickname(memberId, newNickname);
    }
    @PatchMapping("/change-password/{member-id}")
    public ResponseEntity<String> updatePassword(@PathVariable("member-id") Long memberId,
                                                 @RequestBody MemberDto.PasswordChangeRequest request) {

        boolean isPasswordUpdated = memberService.updatePassword(memberId, request.getOldPassword(), request.getNewPassword());

        if (isPasswordUpdated) {
            return ResponseEntity.ok("비밀번호 변경 성공");
        } else {
            return ResponseEntity.badRequest().body("비밀번호 변경 실패");
        }
    }
    @PostMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(@RequestParam("email") String email, Long memberId) {
        try {
            memberService.verifyEmail(email);
            return ResponseEntity.ok("member_id :" + memberId);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        }
    }
    @PatchMapping("/find-password/{member-id}")
    public ResponseEntity<String> changePassword(@PathVariable("member-id") Long memberId,
                                                 @RequestParam("new_password") String newPassword,
                                                 @RequestParam("confirm_password") String confirmPassword) {
        try {
            memberService.changePassword(memberId, newPassword, confirmPassword);
            return ResponseEntity.ok("비밀번호가 성공적으로 변경되었습니다.");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("사용자를 찾을 수 없습니다.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @PatchMapping("/oauth2/sign-up/{member-id}")
    public ResponseEntity<String> social_signup(@PathVariable("member-id") Long memberId, @RequestBody Map<String, String> requestBody) {
        String newNickname = requestBody.get("newNickname");
        return memberService.updateNickname(memberId, newNickname);
    }
}