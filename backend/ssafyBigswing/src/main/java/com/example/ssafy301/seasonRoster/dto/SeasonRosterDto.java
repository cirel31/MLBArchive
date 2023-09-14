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
    private Long playerId;
    private String playerName;
    private int season;

    public SeasonRosterDto(SeasonRoster seasonRoster) {
        this.id = seasonRoster.getId();
        this.playerId = seasonRoster.getPlayer().getId();
        this.playerName = seasonRoster.getPlayer().getName();
        this.season = seasonRoster.getSeason();
    }
}
