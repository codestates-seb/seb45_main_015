package com.project15.server.member.oauth;

import com.project15.server.member.entity.Member;
import com.project15.server.member.entity.MemberProvider;
import com.project15.server.member.entity.MemberRole;
import lombok.Builder;
import lombok.Getter;


import java.util.Map;
import java.util.UUID;



@Getter
public class OAuthAttributes {
    private String nameAttributeKey;
    private OAuth2UserInfo oAuth2UserInfo;

    @Builder
    public OAuthAttributes(String nameAttributeKey, OAuth2UserInfo oAuth2UserInfo) {
        this.nameAttributeKey = nameAttributeKey;
        this.oAuth2UserInfo = oAuth2UserInfo;
    }
    public static OAuthAttributes of(MemberProvider memberProvider,
                                     String userNameAttributeName, Map<String, Object> attributes) {

        if (memberProvider == MemberProvider.NAVER) {
            return ofNaver(userNameAttributeName, attributes);
        }
        if (memberProvider == MemberProvider.KAKAO) {
            return ofKakao(userNameAttributeName, attributes);
        }
        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oAuth2UserInfo(new KakaoOAuth2UserInfo(attributes))
                .build();
    }

    public static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oAuth2UserInfo(new GoogleOAuth2UserInfo(attributes))
                .build();
    }

    public static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .nameAttributeKey(userNameAttributeName)
                .oAuth2UserInfo(new NaverOAuth2UserInfo(attributes))
                .build();
    }
    public Member toEntity(MemberProvider provider, OAuth2UserInfo oauth2UserInfo) {
        return Member.builder()
                .provider(provider)
                .socialId(oauth2UserInfo.getId())
                .email(UUID.randomUUID() + "@socialUser.com")
                .nickname(oauth2UserInfo.getNickname())
                .Role(MemberRole.SOCIAL)
                .build();
    }
}
