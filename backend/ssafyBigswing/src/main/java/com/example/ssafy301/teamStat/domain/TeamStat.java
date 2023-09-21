package com.example.ssafy301.teamStat.domain;

import com.example.ssafy301.team.domain.Team;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeamStat {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teamstat_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

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
