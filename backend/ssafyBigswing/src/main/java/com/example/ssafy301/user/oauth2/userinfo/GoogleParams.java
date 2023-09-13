package com.example.ssafy301.user.oauth2.userinfo;

import com.example.ssafy301.user.SocialType;
import lombok.Getter;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Getter
public class GoogleParams implements OauthParams{
    private String authorizationCode;
    private String state;

    @Override
    public SocialType oauthProvider() {
        return SocialType.GOOGLE;
    }

    @Override
    public MultiValueMap<String, String> makeBody() {
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", authorizationCode);
        body.add("state", state);
        return body;
    }

    @Override
    public String getAuthorizationCode() {
        return authorizationCode;
    }

}
