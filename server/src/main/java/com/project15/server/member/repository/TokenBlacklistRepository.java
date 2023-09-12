package com.project15.server.member.repository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.security.Key;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class TokenBlacklistRepository {
    private final StringRedisTemplate stringRedisTemplate;

    @Value("${jwt.secret}")
    private String secretKey;

    static final String KEY_PREFIX = "memberId_";

    public void save(String accessToken, Long memberId) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        valueOperations.set(KEY_PREFIX + memberId.toString(), accessToken);

        byte[] decodedSecretKey = Decoders.BASE64.decode(secretKey);
        Key key = Keys.hmacShaKeyFor(decodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(accessToken);

        stringRedisTemplate.expireAt(KEY_PREFIX + memberId, claims.getBody().getExpiration());
    }

    public Optional<String> findByMemberId(Long memberId) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        Optional<String> findValue = Optional.ofNullable(valueOperations.get(KEY_PREFIX + memberId));
        return findValue;
    }
}
