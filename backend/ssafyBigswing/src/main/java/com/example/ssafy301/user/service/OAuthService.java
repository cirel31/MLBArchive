package com.example.ssafy301.user.service;

import com.example.ssafy301.user.domain.User;
import com.example.ssafy301.user.dto.UserDTO;
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

    public UserDTO getMemberByOauthLogin(OauthParams oauthParams) {
        log.debug("------ Oauth 로그인 시도 ------");

        OauthMember oauthMember = requestOauthInfoService.request(oauthParams);
        log.debug("진짜 유저 정보이다: " + oauthMember);
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
                .socialType(oauthMember.getOauthProvider())
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
            log.debug("회원가입 완료 :: " + accessUser.getEmail());
            log.debug("회원가입 완료 :: " + accessUser.getSignupDate());
            log.debug("회원가입 완료 :: " + accessUser.getRefreshToken());
            log.debug("회원가입 완료 :: " + accessUser.getSocialType());
            log.debug("회원가입 완료 :: " + accessUser.getId());


        }

        log.debug("------ JWT 발급 ------");
        accessJwt = jwtProvider.createToken(accessUser);
        String refreshToken = jwtProvider.createRefreshToken(accessUser);
        // DB에 리프레시 토큰 저장 (이 부분은 옵션이며, 리프레시 토큰을 DB에 저장해야할 경우에만 필요합니다.)
        if (result == null) { // 새로운 유저의 경우
            accessUser.updateRefreshToken(refreshToken);
            userRepository.save(accessUser);
        } else { // 기존 유저의 경우
            result.updateRefreshToken(refreshToken);
            userRepository.save(result);
        }
        log.debug("------ JWT 발급완료 ------");
        return new UserDTO(oauthMember.getEmail(), oauthMember.getNickName(), oauthMember.getProfileImage(), oauthMember.getOauthProvider(), refreshToken, accessJwt);
    }

    // "Bearer {AT}"에서 {AT} 추출
    public String resolveToken(String requestAccessTokenInHeader) {
        if (requestAccessTokenInHeader != null && requestAccessTokenInHeader.startsWith("Bearer ")) {
            return requestAccessTokenInHeader.substring(7);
        }
        return null;
    }

    public Long extractID(String accessToken) {
        String token = resolveToken(accessToken);
        return Long.parseLong(jwtProvider.getClaims(token).get("user_id").toString());
    }

}
