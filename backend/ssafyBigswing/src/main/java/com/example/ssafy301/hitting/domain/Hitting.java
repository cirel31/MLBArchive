package com.example.ssafy301.hitting.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Hitting {

    @Id
    @Column(name = "hitting_stat_id")
    private Long id;

    private Long playerId;
    private int season;
    private int gamesPlayed;
    private float battingAvg;
    private float sluggingAvg;
    private float OBP;
    private int hits;
    private int runs;
    private int RBI;

    private int homerun;

    // 도루수
    private int stolenbases;

    private float ops;
    private float wrc;
    private float war;


}
