package com.example.ssafy301.user.service;

import com.example.ssafy301.user.entity.User;
import com.example.ssafy301.user.jwt.JwtProvider;
import com.example.ssafy301.user.oauth2.userinfo.OauthMember;
import com.example.ssafy301.user.oauth2.userinfo.OauthParams;
import com.example.ssafy301.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Component
@Service
public class OAuthService {
    private final UserRepository userRepository; // MemberDAO -> UserRepository
    private final RequestOauthInfoService requestOauthInfoService;
    private final JwtProvider jwtProvider;

    public String getMemberByOauthLogin(OauthParams oauthParams) {
        log.debug("------ Oauth 로그인 시도 ------");

        OauthMember oauthMember = requestOauthInfoService.request(oauthParams);
        log.debug("전달받은 유저정보:: " + oauthMember.getEmail());
        if(oauthMember.getNickName()==null){
            oauthMember.setNickName(oauthMember.getEmail());
        }
        // 획득한 회원정보로 검증할 User 객체 생성
        User accessUser = User.builder()
                .email(oauthMember.getEmail())
                .nickname(oauthMember.getNickName())
                .profileImage(oauthMember.getProfileImage())
                .signupDate(LocalDate.now())
                .build();

        // 획득된 회원정보 DB 조회
        Optional<User> resultOptional = userRepository.findByEmail(accessUser.getEmail());
        User result = resultOptional.orElse(null);

        String accessJwt = null;

        if (result == null) {
            log.debug("------ 회원가입 필요한 회원 ------");
            log.debug("회원가입 요청 :: " + accessUser.getNickname());

            // oauthMember에서 전달된 데이터를 가진 User 객체 DB 저장
            userRepository.save(accessUser);

            log.debug("회원가입 완료 :: " + accessUser.getNickname());
        }

        log.debug("------ JWT 발급 ------");
        accessJwt = jwtProvider.createToken(accessUser);

        log.debug("------ JWT 발급완료 ------");
        return accessJwt;
    }
}
