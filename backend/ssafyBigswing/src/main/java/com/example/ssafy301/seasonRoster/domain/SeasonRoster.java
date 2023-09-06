package com.example.ssafy301.seasonRoster.domain;

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
public class SeasonRoster {

    @Id
    @Column(name = "sr_id")
    private Long id;

    @Column(name = "player_id")
    private Long playerId;
    @Column(name = "team_id")
    private Long teamId;
    private int season;
}
