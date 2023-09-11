package com.example.ssafy301.user.oauth2.userinfo;

import lombok.Data;

@Data
public class NaverToken {
    private String token_type;
    private String access_token;
    private String refresh_token;
    private int expires_in;
}