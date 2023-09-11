package com.example.ssafy301.pitching.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Pitching {

    @Id @GeneratedValue
    @Column(name = "pitching_stat_id")
    private Long id;

    private Long playerId;
    private int season;
    private int gamesPlayed;
    private float inningsPlayed;
    private int win;
    private int lose;
    private float era; // 방어율
    private int save;
    private float whip;
    private float kbb;
    private int blownsave; // 블론세이브수


}
