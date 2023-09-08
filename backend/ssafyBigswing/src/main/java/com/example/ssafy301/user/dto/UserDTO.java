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
}
