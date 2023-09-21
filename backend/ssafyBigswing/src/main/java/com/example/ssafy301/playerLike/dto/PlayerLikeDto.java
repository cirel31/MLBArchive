package com.example.ssafy301.playerLike.dto;

import com.example.ssafy301.player.domain.Player;
import com.example.ssafy301.player.domain.Position;
import com.example.ssafy301.player.domain.UseHand;
import com.example.ssafy301.playerLike.domain.PlayerLike;
import com.example.ssafy301.user.domain.User;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PlayerLikeDto {
    private Long id;
    // 선수 프로필 이미지, 선수 이름, 선수 아이디
    private Long playerId;
    private String name;
    private String korName;
    private String image;

    public PlayerLikeDto(PlayerLike playerLike) {
        this.id = playerLike.getId();
        this.playerId = playerLike.getPlayer().getId();
        this.name = playerLike.getPlayer().getName();
        this.korName = playerLike.getPlayer().getKorName();
        this.image = playerLike.getPlayer().getImage();
    }
}
