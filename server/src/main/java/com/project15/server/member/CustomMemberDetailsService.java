package com.project15.server.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomMemberDetailsService implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;


    @Override
    public UserDetails loadUserByUsername(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isPresent()) {
            Member memberValue = member.get();

            return org.springframework.security.core.userdetails.User.builder()
                    .username(email)
                    .password(memberValue.getPassword())
                    .roles("Member")
                    .build();
        } else {

            throw new UsernameNotFoundException("사용자를 찾을 수 없습니다.");
        }
    }
}


