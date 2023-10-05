package com.example.ssafy301.user.service;

import com.example.ssafy301.user.SocialType;
import com.example.ssafy301.user.oauth2.userinfo.OauthMember;
import com.example.ssafy301.user.oauth2.userinfo.OauthParams;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Component
public class RequestOauthInfoService {
    //Enum = 키, Client = 값으로 저장하는 Map 생성
    private final Map<SocialType, OauthClient> clients;

    //생성과 동시에 클라이언트 주입
    public RequestOauthInfoService(List<OauthClient> clients) {
        this.clients = clients.stream().collect(
                Collectors.toUnmodifiableMap(OauthClient::oauthProvider, Function.identity()));
    }

    //넘겨받은 params의 enum 클래스와 동일한 객체를 주입
    public OauthMember request(OauthParams oauthParams) {
        log.debug("이거 되냐?");
        OauthClient client = clients.get(oauthParams.oauthProvider());
        String accessToken = client.getOauthLoginToken(oauthParams);
        log.debug("이거 되냐222222?");
        return client.getMemberInfo(accessToken);
    }
}
