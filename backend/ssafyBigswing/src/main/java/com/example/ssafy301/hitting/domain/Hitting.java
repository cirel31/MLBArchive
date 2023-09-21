package com.example.ssafy301.hitting.domain;

import com.example.ssafy301.player.domain.Player;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Hitting {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hitting_stat_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "player_id")
    private Player player;

    private int season;
    private int gamesPlayed;
    private float battingAvg; // 타율
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
    private int atBats; // 타수


}
