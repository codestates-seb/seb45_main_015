package com.project15.server.member.service;

import com.project15.server.member.dto.MemberDto;
import com.project15.server.member.entity.Authority;
import com.project15.server.member.repository.MemberRepository;
import com.project15.server.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomMemberDetailsService customMemberDetailsService;

    public Member signup(MemberDto memberDto) {
        if (memberRepository.findOneWithAuthoritiesByEmail(memberDto.getEmail()).orElse(null) != null) {
            throw new RuntimeException("이미 사용중인 이메일 입니다.");
        }
       /* if (nicknameAlreadyUse(memberDto.getNickname())) {
            throw new IllegalArgumentException("이미 사용 중인 이름입니다.");
        }*/

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        Member member = Member.builder()
                .email(memberDto.getEmail())
                .password(passwordEncoder.encode(memberDto.getPassword()))
                .nickname(memberDto.getNickname())
                .build();

        return memberRepository.save(member);
    }
    //유저, 권한정보를 가져오는 메소드
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
    public ResponseEntity<String> updateNickname(Long memberId,String password,String newNickname) {
        Member member = getEmailByMemberId(memberId);

        if (member != null) {
            String email = member.getEmail();
            boolean isAuthenticated = authenticateMember(email, password);

            if (isAuthenticated) {
                // 닉네임 중복 검사
                boolean isNicknameUnique = !nicknameAlreadyUse(newNickname);

                if (isNicknameUnique) {
                    boolean isUpdated = updateMemberNickname(email, newNickname);

                    if (isUpdated) {
                        return ResponseEntity.ok("닉네임 수정 성공");
                    } else {
                        return ResponseEntity.badRequest().body("닉네임 수정 실패");
                    }
                } else {
                    return ResponseEntity.badRequest().body("이미 사용 중인 닉네임입니다.");
                }
            } else {
                return ResponseEntity.badRequest().body("비밀번호가 틀렸습니다.");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    //비밀번호 변경
    public boolean updatePassword(Long memberId, String oldPassword, String newPassword) {
        Member member = getEmailByMemberId(memberId);

        if (member != null) {
            String email = member.getEmail();
            boolean isAuthenticated = authenticateMember(email, oldPassword);

            if (isAuthenticated) {
                // 이전 비밀번호와 일치할 경우 새로운 비밀번호로 변경
                member.setPassword(passwordEncoder.encode(newPassword));
                memberRepository.save(member); // 변경된 정보를 저장

                return true; // 업데이트 성공
            }
        }
        return false; // 업데이트 실패
    }


    // 닉네임 중복 검사
    public boolean nicknameAlreadyUse(String nickname) {
        return memberRepository.findByNickname(nickname).isPresent();
    }
    // 이메일 중복 검사
    public boolean emailAlreadyUse(String email) {
        return memberRepository.findByEmail(email).isPresent();
    }

    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }
    public Member getMemberByEmail(String email) {
        return memberRepository.findByEmail(email).orElse(null);
    }
    public Member getEmailByMemberId(Long memberId) {
        return memberRepository.findByMemberId(memberId).orElse(null);
    }
    //회원 닉네임 변경 메서드
    private boolean updateMemberNickname(String email, String newNickname) {
        // 이메일로 회원 정보를 조회
        Optional<Member> memberOptional = memberRepository.findByEmail(email);

        if (memberOptional.isPresent()) {
            Member member = memberOptional.get();

            // 회원의 닉네임을 업데이트
            member.setNickname(newNickname);
            memberRepository.save(member); // 변경된 정보를 저장

            return true; // 업데이트 성공
        }

        return false; // 업데이트 실패
    }
    public boolean authenticateMember(String email, String password) {
        UserDetails userDetails = customMemberDetailsService.loadUserByUsername(email);

        return passwordEncoder.matches(password, userDetails.getPassword());
    }
}


