package com.example.ssafy301.user.oauth2.userinfo;

import lombok.Data;
@Data
public class KakaoToken {
    private String token_type;
    private String access_token;
    private String refresh_token;
    private String id_token;
    private int expires_in;
    private int refresh_token_expires_in;
    private String scope;
}