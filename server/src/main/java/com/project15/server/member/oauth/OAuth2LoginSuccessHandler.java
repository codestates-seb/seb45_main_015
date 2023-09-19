package com.project15.server.member.oauth;

import com.project15.server.member.entity.Member;
import com.project15.server.member.entity.MemberRole;
import com.project15.server.member.jwt.TokenProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final TokenProvider tokenProvider;


    public OAuth2LoginSuccessHandler(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();


        Member member = tokenProvider.getMemberByEmail(userDetails.getUsername());
        CustomOauth2User oauth2User = (CustomOauth2User) authentication.getPrincipal();
        if (oauth2User.getRole() == MemberRole.SOCIAL) {
            String token = tokenProvider.createToken(authentication, member);
            response.addHeader("Authorization", "Bearer " + token);
            response.sendRedirect("/members/oauth2/sign-up");
            tokenProvider.updateMemberRole(member);
        }
    }
}
