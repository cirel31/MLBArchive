package com.example.ssafy301.user.service;

import com.example.ssafy301.user.SocialType;
import com.example.ssafy301.user.oauth2.userinfo.OauthMember;
import com.example.ssafy301.user.oauth2.userinfo.OauthParams;

public interface OauthClient {
    public SocialType oauthProvider();
    public String getOauthLoginToken(OauthParams oauthParams);
    public OauthMember getMemberInfo(String accessToken);
}
