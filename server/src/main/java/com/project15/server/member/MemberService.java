package com.project15.server.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private CustomMemberDetailsService customMemberDetailsService;

    public Member createMember(String email, String password, String nickname) {
        if (emailAlreadyUse(email)) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
        if (nicknameAlreadyUse(nickname)) {
            throw new IllegalArgumentException("이미 사용 중인 이름입니다.");
        }
        Member member = new Member();
        member.setEmail(email);
        member.setPassword(passwordEncoder.encode(password));
        member.setNickname(nickname);

        return memberRepository.save(member);
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


