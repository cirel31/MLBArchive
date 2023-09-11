package com.example.ssafy301.user.oauth2.userinfo;

import com.example.ssafy301.user.SocialType;
import lombok.Getter;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Getter
public class KakaoParams implements OauthParams{
    // Controller에서 Post요청으로 전달된 파라미터
    private String authorizationCode;
    private String state;
    @Override
    public SocialType oauthProvider() {
        return SocialType.KAKAO; // Enum 자료형 지정
    }

    @Override
    public MultiValueMap<String, String> makeBody() {
        // 필수로 포함되어야할 Body 작성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("code", authorizationCode);
        //body.add("state", state);
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
