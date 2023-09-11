package com.example.ssafy301.user.oauth2.userinfo;

import com.example.ssafy301.user.SocialType;
import lombok.Getter;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Getter
public class NaverParams implements OauthParams{
    // Post 요청 시 파라미터로 전달
    private String authorizationCode;
    private String state;

    @Override
    public SocialType oauthProvider() {
        return SocialType.NAVER; // Enum 자료형 지정
    }

    @Override
    public MultiValueMap<String, String> makeBody() {
        // Body 지정
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", authorizationCode);
        body.add("state", state);
        return body;
    }

    @Override
    public String getAuthorizationCode() {
        return authorizationCode;
    }
    public void setAuthorizationCode(String authorizationCode) {
        this.authorizationCode = authorizationCode;
    }

    public void setState(String state) {
        this.state = state;
    }
}
