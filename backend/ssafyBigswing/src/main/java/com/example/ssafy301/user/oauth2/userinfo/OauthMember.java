package com.example.ssafy301.user.oauth2.userinfo;

import com.example.ssafy301.user.SocialType;

public interface OauthMember {
    public String getEmail();
    public String getNickName();
    SocialType getOauthProvider();
}
