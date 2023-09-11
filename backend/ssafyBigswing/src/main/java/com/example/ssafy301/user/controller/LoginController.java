package com.example.ssafy301.user.controller;

import com.example.ssafy301.user.oauth2.userinfo.KakaoParams;
import com.example.ssafy301.user.oauth2.userinfo.NaverParams;
import com.example.ssafy301.user.service.OAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
@Slf4j
public class LoginController {
    @Autowired
    private OAuthService oauthService;

    @PostMapping("/oauth/kakao")
    public ResponseEntity<String> handleKakaoLogin(@RequestBody KakaoParams kakaoParams){
        log.debug("넘겨받은 Kakao 인증키 :: " + kakaoParams.getAuthorizationCode());

        String accessToken = oauthService.getMemberByOauthLogin(kakaoParams);
        //응답 헤더 생성
        HttpHeaders headers = new HttpHeaders();
        headers.set("accessToken", accessToken);

        return ResponseEntity.ok().headers(headers).body("Response with header using ResponseEntity");
    }

    @PostMapping("/oauth/naver")
    public ResponseEntity<String> handleNaverLogin(@RequestBody NaverParams naverParams){
        log.debug("넘겨받은 naver 인증키 :: " + naverParams.getAuthorizationCode());

        String accessToken = oauthService.getMemberByOauthLogin(naverParams);
        //응답 헤더 생성
        HttpHeaders headers = new HttpHeaders();
        headers.set("accessToken", accessToken);

        return ResponseEntity.ok().headers(headers).body("Response with header using ResponseEntity");
    }
}
