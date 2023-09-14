package com.example.ssafy301.team.dto;

import com.example.ssafy301.team.domain.Team;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TeamDto {

    private Long id;
    private String teamName;
    private LocalDateTime createdDate;
    private String teamLogo;
    private String teamLocation;

    public TeamDto(Team team) {
        this.id = team.getId();
        this.teamName = team.getTeamName();
        this.createdDate = team.getCreatedDate();
        this.teamLogo = team.getTeamLogo();
        this.teamLocation = team.getTeamLocation();
    }
}
