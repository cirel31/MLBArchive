package com.example.ssafy301.playerLike.dto;

import com.example.ssafy301.player.domain.Player;
import com.example.ssafy301.playerLike.domain.PlayerLike;
import com.example.ssafy301.user.domain.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PlayerLikeDto {
    private Long id;
    private User user;
    private Player player;
    private LocalDate likedDate;

    public PlayerLikeDto(PlayerLike playerLike) {
        this.id = playerLike.getId();
        this.user = playerLike.getUser();
        this.player = playerLike.getPlayer();
        this.likedDate = playerLike.getLikedDate();
    }
}
