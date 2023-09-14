package com.example.ssafy301.user.oauth2.userinfo;

import lombok.Data;


@Data
public class GoogleToken {
    private String access_token;
    private String token_type;
    private long expires_in;
    private String refresh_token;
    private String scope;
    private String id_token;
}
