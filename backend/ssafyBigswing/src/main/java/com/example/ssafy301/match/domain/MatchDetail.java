package com.example.ssafy301.match.domain;

import jakarta.persistence.*;
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
    @Column(name = "match_id")
    private Long matchId;
    @Column(columnDefinition = "MEDIUMTEXT")
    private String linescore;
    @Column(columnDefinition = "MEDIUMTEXT")
    private String boxscore;
}
