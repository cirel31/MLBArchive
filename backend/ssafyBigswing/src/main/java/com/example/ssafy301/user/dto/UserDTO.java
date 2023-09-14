package com.example.ssafy301.user.dto;
import com.example.ssafy301.user.SocialType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private String email;
    private String nickname;
    private String profileImage;
    private SocialType socialType; // KAKAO, NAVER, GOOGLE
    private String refreshToken;
    private String accessToken; // 추가

    public UserDTO(String email, String nickname, String profileImage, SocialType socialType, String refreshToken, String accessToken) {
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.socialType = socialType;
        this.refreshToken = refreshToken;
        this.accessToken = accessToken; // 추가
    }
}
