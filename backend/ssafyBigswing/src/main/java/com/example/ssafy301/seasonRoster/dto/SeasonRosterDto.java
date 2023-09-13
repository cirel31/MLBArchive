package com.example.ssafy301.seasonRoster.dto;

import com.example.ssafy301.player.domain.Player;
import com.example.ssafy301.seasonRoster.domain.SeasonRoster;
import com.example.ssafy301.team.domain.Team;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class SeasonRosterDto {

    private Long id;
    private Player player;
    private Team team;
    private int season;

    public SeasonRosterDto(SeasonRoster seasonRoster) {
        this.id = seasonRoster.getId();
        this.player = seasonRoster.getPlayer();
        this.team = seasonRoster.getTeam();
        this.season = seasonRoster.getSeason();
    }
}
