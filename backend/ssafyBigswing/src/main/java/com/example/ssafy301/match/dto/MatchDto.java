package com.example.ssafy301.match.dto;

import com.example.ssafy301.match.domain.Match;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MatchDto {
    private Long id;
    private Long homeId;
    private Long awayId;
    private String homePitcher;
    private String awayPitcher;
    private LocalDateTime matchDate;
    private int homeScore;
    private int awayScore;
    private String homeName;
    private String awayName;
    private String status;
    private int currentInning;

    public MatchDto(Match match) {
        this.id = match.getId();
        this.homeId = match.getHomeId();
        this.awayId = match.getAwayId();
        this.homePitcher = match.getHomePitcher();
        this.awayPitcher = match.getAwayPitcher();
        this.matchDate = match.getMatchDate();
        this.homeScore = match.getHomeScore();
        this.awayScore = match.getAwayScore();
        this.homeName = match.getHomeName();
        this.awayName = match.getAwayName();
        this.status = match.getStatus();
        this.currentInning = match.getCurrentInning();
    }
}
