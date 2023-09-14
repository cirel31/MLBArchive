package com.example.ssafy301.playerLike.dto;

import com.example.ssafy301.playerLike.domain.PlayerLike;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PlayerLikeDto {
    private Long id;
    private Long userId;
    private Long playerId;
    private LocalDateTime likedDate;

    public PlayerLikeDto(PlayerLike playerLike) {
        this.id = playerLike.getId();
        //this.userId = playerLike.getUserId();
        //this.playerId = playerLike.getPlayerId();
        this.likedDate = playerLike.getLikedDate();
    }
}
