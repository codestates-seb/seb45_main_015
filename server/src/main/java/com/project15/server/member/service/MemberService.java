package com.project15.server.member.service;

import com.project15.server.member.dto.MemberDto;
import com.project15.server.member.repository.MemberRepository;
import com.project15.server.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomMemberDetailsService customMemberDetailsService;

    private static final String EMAIL_REGEX = "^[A-Za-z0-9+_.-]+@(.+)$";
    private static final Pattern EMAIL_PATTERN = Pattern.compile(EMAIL_REGEX);

    private static final String PASSWORD_REGEX = "^(?=.*[A-Za-z])(?=.*\\d|.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$";
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(PASSWORD_REGEX);

    public Member findByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        return optionalMember.orElse(null);
    }

    private boolean isValidEmailFormat(String email) {
        return EMAIL_PATTERN.matcher(email).matches();
    }

    private boolean isValidPassword(String password) {
        return PASSWORD_PATTERN.matcher(password).matches();
    }
    private boolean isValidNickname(String nickname) {
        String nicknamePattern = "^[a-zA-Z0-9]+$";
        return nickname.matches(nicknamePattern);
    }

    public Member signup(MemberDto memberDto) {
        if (memberRepository.findOneWithAuthoritiesByEmail(memberDto.getEmail()).orElse(null) != null) {
            throw new RuntimeException("이미 사용중인 이메일 입니다.");
        }
        if (!isValidEmailFormat(memberDto.getEmail())) {
            throw new RuntimeException("올바르지 않은 이메일 형식입니다.");
        }
        if (!isValidPassword(memberDto.getPassword())) {
            throw new RuntimeException("비밀번호는 최소 8자리 이상이어야 하며, 영문, 숫자, 특수문자 중 2가지 이상의 조합이어야 합니다.");
        }
        if (!isValidNickname(memberDto.getNickname())) {
            throw new RuntimeException("닉네임은 특수문자를 포함할 수 없습니다.");
        }
        Member member = Member.builder()
                .email(memberDto.getEmail())
                .password(passwordEncoder.encode(memberDto.getPassword()))
                .nickname(memberDto.getNickname())
                .build();

        return memberRepository.save(member);
    }

    @Transactional(readOnly = true)
    public Optional<Member> getMemberWithAuthorities(String email) {
        return memberRepository.findOneWithAuthoritiesByEmail(email);
    }

    @Transactional(readOnly = true)
    public Optional<Member> getMyUserWithAuthorities() {
        return SecurityUtil.getCurrentUsername()
                .flatMap(memberRepository::findOneWithAuthoritiesByEmail);
    }

    //닉네임 변경
    public ResponseEntity<String> updateNickname(Long memberId, String newNickname) {
        Member member = getEmailByMemberId(memberId);

        if (member == null) {
            throw new RuntimeException("사용자를 찾을 수 없습니다.");
        }
        String email = member.getEmail();
        if (!isValidNickname(newNickname)) {
            throw new RuntimeException("닉네임은 특수문자를 포함할 수 없습니다.");
        }
        if (nicknameAlreadyUse(newNickname)) {
            throw new RuntimeException("이미 사용 중인 닉네임입니다.");
        }
        if (updateMemberNickname(email, newNickname)) {
            return ResponseEntity.ok("닉네임 수정 성공");
        } else {
            throw new RuntimeException("닉네임 수정 실패");
        }
    }

    public boolean updatePassword(Long memberId, String oldPassword, String newPassword) {

        Member member = getEmailByMemberId(memberId);
        if (member == null) {
            throw new RuntimeException("사용자를 찾을 수 없습니다.");
        }
        String email = member.getEmail();
        if (!authenticateMember(email, oldPassword)) {
            throw new RuntimeException("비밀번호가 틀렸습니다.");
        }
        String passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";
        if (!newPassword.matches(passwordPattern)) {
            throw new RuntimeException("비밀번호는 최소 8자리 이상이어야 하며, 영문, 숫자, 특수문자 중 2가지 이상의 조합이어야 합니다.");
        }
        member.setPassword(passwordEncoder.encode(newPassword));
        memberRepository.save(member);

        return true;
    }

    // 닉네임 중복 검사
    public boolean nicknameAlreadyUse(String nickname) {
        return memberRepository.findByNickname(nickname).isPresent();
    }

    // 이메일 중복 검사
    public boolean emailAlreadyUse(String email) {
        return memberRepository.findByEmail(email).isPresent();
    }

    public Member getEmailByMemberId(Long memberId) {
        return memberRepository.findByMemberId(memberId).orElse(null);
    }

    //회원 닉네임 변경
    private boolean updateMemberNickname(String email, String newNickname) {

        Optional<Member> memberOptional = memberRepository.findByEmail(email);

        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();

            member.setNickname(newNickname);
            memberRepository.save(member);

            return true;
        }

        return false;
    }

    public boolean authenticateMember(String email, String password) {
        UserDetails userDetails = customMemberDetailsService.loadUserByUsername(email);

        return passwordEncoder.matches(password, userDetails.getPassword());
    }
    public void changePassword(Long memberId, String newPassword, String confirmPassword) {
        if (!newPassword.equals(confirmPassword)) {
            throw new RuntimeException("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }
        String passwordPattern = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";
        if (!newPassword.matches(passwordPattern)) {
            throw new RuntimeException("비밀번호는 최소 8자리 이상이어야 하며, 영문, 숫자, 특수문자 중 2가지 이상의 조합이어야 합니다.");
        }
        Optional<Member> memberOptional = memberRepository.findByMemberId(memberId);
        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();
            member.setPassword(passwordEncoder.encode(newPassword));
            memberRepository.save(member);
        } else {
            throw new UserNotFoundException("사용자를 찾을 수 없습니다.");
        }
    }
    public void verifyEmail(String email) {
        Optional<Member> memberOptional = memberRepository.findByEmail(email);
        if (memberOptional.isEmpty()) {
            throw new RuntimeException("사용자를 찾을 수 없습니다.");
        }
    }
}