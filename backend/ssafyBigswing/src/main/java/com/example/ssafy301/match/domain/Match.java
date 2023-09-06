package com.example.ssafy301.match.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Match {
    @Id
    @Column(name = "match_id")
    private Long id;

    // 홈팀ID
    @Column(name = "home_id")
    private Long homeId;

    // 어웨이팀ID
    @Column(name = "away_id")
    private Long awayId;

    @Column(name = "home_pitcher")
    private String homePitcher;

    @Column(name = "away_pitcher")
    private String awayPitcher;

    @Column(name = "match_date")
    private LocalDateTime matchDate;

    // 홈팀 점수
    @Column(name = "home_score")
    private int homeScore;

    @Column(name = "away_score")
    private int awayScore;

    @Column(name = "home_name")
    private String homeName;

    @Column(name = "away_name")
    private String awayName;

    private String status;

    @Column(name = "current_inning")
    private int currentInning;
}
