package com.example.ssafy301.user.domain;

import com.example.ssafy301.common.domain.util.BaseTimeEntity;
import com.example.ssafy301.user.SocialType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private long Id;

    @Column(nullable = false)
    private String email;

    @Column
    private String nickname;

    @Column
    private String profileImage;

    @Column
    private LocalDate signupDate;

    @Enumerated(EnumType.STRING)
    private SocialType socialType; // KAKAO, NAVER, GOOGLE


    private String refreshToken; // 리프레시 토큰

    public void updateRefreshToken(String updateRefreshToken) {
        this.refreshToken = updateRefreshToken;
    }



}
