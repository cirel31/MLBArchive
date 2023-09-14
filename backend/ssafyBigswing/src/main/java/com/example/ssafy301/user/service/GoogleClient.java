package com.example.ssafy301.user.service;

import com.example.ssafy301.user.SocialType;
import com.example.ssafy301.user.oauth2.userinfo.GoogleMember;
import com.example.ssafy301.user.oauth2.userinfo.GoogleToken;
import com.example.ssafy301.user.oauth2.userinfo.OauthMember;
import com.example.ssafy301.user.oauth2.userinfo.OauthParams;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Component
public class GoogleClient implements OauthClient{
    private static final String GRANT_TYPE = "authorization_code";

    @Value("${google.token-uri}")
    private String token_url;
    @Value("${google.user-info-uri}")
    private String user_url;
    @Value("${google.client-id}")
    private String client_id;
    @Value("${google.client-secret}")
    private String client_secret;
    @Value("${google.redirect-uri}")
    private String redirect_uri;

    @Override
    public SocialType oauthProvider() {
        return SocialType.GOOGLE;
    }
    @Override
    public String getOauthLoginToken(OauthParams oauthParams) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        log.debug("333333333333");
        MultiValueMap<String, String> body = oauthParams.makeBody();
        body.add("grant_type", GRANT_TYPE);
        body.add("client_id", client_id);
        body.add("client_secret", client_secret); // Google requires client_secret for server-side auth
        body.add("redirect_uri", redirect_uri);
        log.debug("44444444444");
        HttpEntity<MultiValueMap<String, String>> tokenRequest = new HttpEntity<>(body, headers);
        GoogleToken googleToken = rt.postForObject(token_url, tokenRequest, GoogleToken.class);
        log.debug("5555555555");
        return googleToken.getAccess_token();
    }

    @Override
    public OauthMember getMemberInfo(String accessToken) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        log.debug("66666666666");
        HttpEntity<String> entity = new HttpEntity<String>("parameters", headers);
        log.debug("77777777777");
        log.debug("확인 : "+entity);
        log.debug("확인222 : "+user_url);
        return rt.exchange(user_url, HttpMethod.GET, entity, GoogleMember.class).getBody();
    }
}
