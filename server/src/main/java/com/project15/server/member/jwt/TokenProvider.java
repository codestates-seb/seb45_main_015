package com.project15.server.member.jwt;

import com.project15.server.member.entity.Member;
import com.project15.server.member.entity.MemberRole;
import com.project15.server.member.repository.MemberRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class TokenProvider {

    private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);
    private static final String AUTHORITIES_KEY = "auth";
    private final MemberRepository memberRepository;


    @Value("${jwt.secret}") private String secret;
    @Value("${jwt.token-validity-in-seconds}") private long tokenValidityInSeconds;

    public TokenProvider(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }


    public String createToken(Authentication authentication, Member member) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        Map<String, Object> claims = new HashMap<>();

        claims.put("memberId", member.getMemberId());
        claims.put("nickname", member.getNickname());
        claims.put(AUTHORITIES_KEY, authorities);

        long now = (new Date()).getTime();
        Date validity = new Date(now + tokenValidityInSeconds * 1000);
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        Key key = Keys.hmacShaKeyFor(keyBytes);
        return Jwts.builder()
                .setSubject(member.getNickname())
                .setClaims(claims)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }

    public Authentication getAuthentication(String token) {

        byte[] keyBytes = Decoders.BASE64.decode(secret);
        Key key = Keys.hmacShaKeyFor(keyBytes);
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        Collection<? extends GrantedAuthority> authorities = new ArrayList<>();

        String authoritiesStr = (String) claims.get(AUTHORITIES_KEY);

        if (authoritiesStr != null && !authoritiesStr.isEmpty()) {
            authorities = Arrays.stream(authoritiesStr.split(","))
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
        }
        return new UsernamePasswordAuthenticationToken(claims.getSubject(), token, authorities);
    }
    public boolean validateToken(String token) {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        Key key = Keys.hmacShaKeyFor(keyBytes);


        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {

            logger.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {

            logger.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {

            logger.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {

            logger.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }
    public Member getMemberByEmail(String email) {
        return memberRepository.findByEmail(email).orElse(null);
    }
    public void updateMemberRole(Member member) {
        member.setRole(MemberRole.USER);
        memberRepository.save(member);
    }
}