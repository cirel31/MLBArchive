package com.example.ssafy301.teamStat.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TeamStat {

    @Id @GeneratedValue
    @Column(name = "teamstat_id")
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

}
