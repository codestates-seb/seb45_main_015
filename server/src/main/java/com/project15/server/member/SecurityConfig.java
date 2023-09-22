package com.project15.server.member;

import com.project15.server.member.jwt.JwtAccessDeniedHandler;
import com.project15.server.member.jwt.JwtAuthenticationEntryPoint;
import com.project15.server.member.jwt.JwtSecurityConfig;
import com.project15.server.member.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                // token을 사용하는 방식이기 때문에 csrf를 disable합니다.
                .csrf().disable()

                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                // 세션을 사용하지 않기 때문에 STATELESS로 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeRequests()
                .antMatchers("/members/login").permitAll()
                .antMatchers("/members/signup").permitAll()
                .antMatchers("/members/guest-login").permitAll()
                .antMatchers("/members/verify-email").permitAll()
                .antMatchers("/members/find-password/{member-id}").permitAll()
                .antMatchers("/items/{item-id}").permitAll()
                .antMatchers("/items").permitAll()
                .antMatchers("/items/categories").permitAll()
                .antMatchers("/items/search").permitAll()
                .antMatchers("/categories").permitAll()
                .antMatchers("/email/{email}/send-code").permitAll()
                .antMatchers("/email/{email}/code").permitAll()
                .anyRequest().authenticated()

                .and()
                .apply(new JwtSecurityConfig(tokenProvider)); // JwtFilter를 addFilterBefore로 등록했던 JwtSecurityConfig class 적용

        return httpSecurity.build();
    }
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(""));
        configuration.setAllowedMethods(Arrays.asList(""));
        configuration.setAllowedHeaders(Arrays.asList(""));
        configuration.setExposedHeaders(Arrays.asList(""));
        configuration.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}