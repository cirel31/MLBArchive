package com.example.ssafy301.user.oauth2.userinfo;

import com.example.ssafy301.user.SocialType;
import org.springframework.util.MultiValueMap;

public interface OauthParams {
    public SocialType oauthProvider();
    public String getAuthorizationCode();
    public MultiValueMap<String, String> makeBody();
}
