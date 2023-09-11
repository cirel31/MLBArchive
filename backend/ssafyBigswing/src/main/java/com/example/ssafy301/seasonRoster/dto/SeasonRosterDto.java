package com.example.ssafy301.seasonRoster.dto;

import com.example.ssafy301.seasonRoster.domain.SeasonRoster;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class SeasonRosterDto {

    private Long id;
    private Long playerId;
    private Long teamId;
    private int season;

    public SeasonRosterDto(SeasonRoster seasonRoster) {
        this.id = seasonRoster.getId();
        this.playerId = seasonRoster.getPlayerId();
        this.teamId = seasonRoster.getTeamId();
        this.season = seasonRoster.getSeason();
    }
}
