package com.example.ssafy301.teamLike.dto;

import com.example.ssafy301.team.domain.Team;
import com.example.ssafy301.teamLike.domain.TeamLike;
import com.example.ssafy301.user.domain.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TeamLikeDto {
    private Long id;
    // 팀 id, 이름, 로고
    // 팀 한글 이름은 나중에 어느정도 테스트 마무리됐을 때 넣어서 보내드릴게요!
    private Long teamId;
    private String teamName;
    private String teamLogo;

    public TeamLikeDto(TeamLike teamLike) {
        this.id = teamLike.getId();
        this.teamId = teamLike.getTeam().getId();
        this.teamName = teamLike.getTeam().getTeamName();
        this.teamLogo = teamLike.getTeam().getTeamLogo();
    }
}
