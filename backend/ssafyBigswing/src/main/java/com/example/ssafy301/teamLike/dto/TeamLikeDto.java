package com.example.ssafy301.teamLike.dto;

import com.example.ssafy301.playerLike.domain.PlayerLike;
import com.example.ssafy301.teamLike.domain.TeamLike;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TeamLikeDto {
    private Long id;
    private Long userId;
    private Long teamId;
    private LocalDateTime likedDate;

    public TeamLikeDto(TeamLike teamLike) {
        this.id = teamLike.getId();
        this.userId = teamLike.getUserId();
        this.teamId = teamLike.getTeamId();
        this.likedDate = teamLike.getLikedDate();
    }
}
