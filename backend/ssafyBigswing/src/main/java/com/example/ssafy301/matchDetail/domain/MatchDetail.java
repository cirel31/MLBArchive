package com.example.ssafy301.matchDetail.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MatchDetail {

    @Id
    @Column(name = "match_detail_id")
    private Long id;

    private Long matchId;
    private String linescore;
    private String boxscore;
}
