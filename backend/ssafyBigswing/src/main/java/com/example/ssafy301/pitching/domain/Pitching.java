package com.example.ssafy301.pitching.domain;

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
public class Pitching {

    @Id @GeneratedValue
    @Column(name = "pitching_stat_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "player_id")
    private Player player;

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
