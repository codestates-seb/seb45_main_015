package com.project15.server.member.oauth;

import com.project15.server.member.entity.Member;
import com.project15.server.member.entity.MemberProvider;
import com.project15.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService <OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;

    private static final String NAVER = "naver";
    private static final String KAKAO = "kakao";

    @Override
    public OAuth2User loadUser(OAuth2UserRequest member) throws OAuth2AuthenticationException {
        log.info("CustomOAuth2UserService.loadUser() 실행 - OAuth2 로그인 요청 진입");

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(member);

        String registrationId = member.getClientRegistration().getRegistrationId();
        MemberProvider memberProvider = getmemberProvider(registrationId);
        String userNameAttributeName = member.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        OAuthAttributes extractAttributes = OAuthAttributes.of(memberProvider, userNameAttributeName, attributes);

        Member createdUser = getUser(extractAttributes, memberProvider);


        return new CustomOauth2User(
                Collections.singleton(new SimpleGrantedAuthority(createdUser.getRole().getKey())),
                attributes,
                extractAttributes.getNameAttributeKey(),
                createdUser.getEmail(),
                createdUser.getRole()
        );
    }
    private MemberProvider getmemberProvider(String registrationId) {
        if(NAVER.equals(registrationId)) {
            return MemberProvider.NAVER;
        }
        if(KAKAO.equals(registrationId)) {
            return MemberProvider.KAKAO;
        }
        return MemberProvider.GOOGLE;
    }
    private Member getUser(OAuthAttributes attributes, MemberProvider memberProvider) {
        Member findUser = memberRepository.findByproviderAndSocialId(memberProvider,
                attributes.getOAuth2UserInfo().getId()).orElse(null);

        if(findUser == null) {
            return saveUser(attributes, memberProvider);
        }
        return findUser;
    }
    private Member saveUser(OAuthAttributes attributes, MemberProvider socialType) {
        Member createdUser = attributes.toEntity(socialType, attributes.getOAuth2UserInfo());
        return memberRepository.save(createdUser);
    }
}
