package com.example.ssafy301.match.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "matches")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    private Long matchDetailId;
}
