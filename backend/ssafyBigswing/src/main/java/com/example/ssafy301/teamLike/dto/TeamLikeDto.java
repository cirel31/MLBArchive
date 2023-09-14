package com.example.ssafy301.teamLike.dto;

import com.example.ssafy301.team.domain.Team;
import com.example.ssafy301.teamLike.domain.TeamLike;
import com.example.ssafy301.user.domain.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TeamLikeDto {
    private Long id;
    private User user;
    private Team team;
    private LocalDate likedDate;

    public TeamLikeDto(TeamLike teamLike) {
        this.id = teamLike.getId();
        this.user = teamLike.getUser();
        this.team = teamLike.getTeam();
        this.likedDate = teamLike.getLikedDate();
    }
}
