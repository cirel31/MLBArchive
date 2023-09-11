package com.example.ssafy301.user.jwt;

import com.example.ssafy301.user.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.xml.bind.DatatypeConverter;
import java.util.Date;

@Slf4j
@Setter
@Component
public class JwtProvider {
    private String secretKey ="dasdasf234fuhvertsv34789yhiuFDSIUFGYDTE5r~~~~~~";

    /*
     * 토큰 생성 메소드 jwt에 저장할 회원정보를 파라미터로 전달
     */
    public String createToken(User user) {
        Date now = new Date(System.currentTimeMillis());
        Long expiration = 1000 * 60 * 60L; //만료기한 설정 시 사용

        /* 토큰이 보관할 회원ID */
        Claims claims = Jwts.claims();
        claims.put("userId", user.getId()); //비공개 클레임 등록

        return Jwts.builder().setHeaderParam("typ", "JWT") // 토큰 타입 지정
                .setSubject("accessToken") // 토큰 제목
                .setIssuedAt(now) // 발급시간
                .setExpiration(new Date(System.currentTimeMillis() + expiration)) // 만료기한
                .setClaims(claims) // 회원 아이디 저장(비공개 클레임)
                .signWith(SignatureAlgorithm.HS256, secretKey) //해싱알고리즘과 시크릿 키
                .compact(); //토큰 직렬화
    }

    /* 토큰 해석 메소드 */
    public String getSubject(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(secretKey))
                .parseClaimsJwt(token) //토큰 파싱
                .getBody();
        log.debug("해독된 토큰:: " + claims.getSubject());
        return claims.getSubject();
    }

    /* 유효성 확인(해독된 jwt) */
    public boolean vaildToken(String jwt) {

            Claims claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(secretKey))
                    .parseClaimsJwt(jwt) //해독된 토큰 파싱
                    .getBody();
            return true;  //유효하다면 true 반환

    }
}
