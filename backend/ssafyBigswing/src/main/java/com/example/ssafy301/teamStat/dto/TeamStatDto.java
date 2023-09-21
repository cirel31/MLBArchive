package com.example.ssafy301.teamStat.dto;

import com.example.ssafy301.teamStat.domain.TeamStat;
import lombok.Data;

@Data
public class TeamStatDto {

    private Long id;
    private Long teamId;
    private int season;
    private float winPercentage;
    private int win;
    private int lose;
    private int draw;
    private float battingAvg;
    private float eraAvg;
    private int divisionRank;
    private int leagueRank;

    public TeamStatDto(TeamStat teamStat) {
        this.id = teamStat.getId();
        this.teamId = teamStat.getTeam().getId();
        this.season = teamStat.getSeason();
        this.winPercentage = teamStat.getWinPercentage();
        this.win = teamStat.getWin();
        this.lose = teamStat.getLose();
        this.draw = teamStat.getDraw();
        this.battingAvg = teamStat.getBattingAvg();
        this.eraAvg = teamStat.getEraAvg();
        this.divisionRank = teamStat.getDivisionRank();
        this.leagueRank = teamStat.getLeagueRank();
    }
}
