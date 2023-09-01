package com.project15.server.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Member signupMember(String email, String password, String nickname) {
        if (memberRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
        if (memberRepository.findByNickname(nickname).isPresent()) {
            throw new IllegalArgumentException("이미 사용 중인 이름입니다.");
        }
        Member member = new Member();
        member.setEmail(email);
        member.setPassword(passwordEncoder.encode(password));
        member.setNickname(nickname);

        return memberRepository.save(member);
    }

    public Member saveMember(Member member) {
        return memberRepository.save(member);
    }
    public Member getUserByEmail(String email) {
        return memberRepository.findByEmail(email).orElse(null);
    }
    public boolean authenticateUser(String email, String password) {
        Member member = getUserByEmail(email);
        if (member != null) {
            return passwordEncoder.matches(password, member.getPassword());
        }
        return false;
    }
}
