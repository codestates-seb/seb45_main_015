package com.project15.server.member.service;

import com.project15.server.member.entity.GuestUser;
import com.project15.server.member.entity.MemberRole;
import com.project15.server.member.repository.AuthService;
import com.project15.server.member.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String guestLogin() {
        String randomPassword = generateRandomPassword();

        GuestUser guestUser = new GuestUser();
        guestUser.setUsername("Guest");
        guestUser.setPassword(passwordEncoder.encode(randomPassword));
        guestUser.setRole(MemberRole.GUEST);

        userRepository.save(guestUser);

        String token = generateJwtToken(guestUser);

        return token;
    }
    @Value("${jwt.secret}") private String secret;
    private String generateJwtToken(GuestUser user) {
        long expirationMs = 86400000; // 24시간 (밀리초)

        Map<String, Object> claims = new HashMap<>();

        claims.put("memberId", user.getGuestId());
        claims.put("nickname", user.getUsername());

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    private String generateRandomPassword() {
        int passwordLength = 12; // 비밀번호 길이
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
        StringBuilder randomPassword = new StringBuilder();

        for (int i = 0; i < passwordLength; i++) {
            int index = (int) (Math.random() * characters.length());
            randomPassword.append(characters.charAt(index));
        }

        return randomPassword.toString();
    }
}
