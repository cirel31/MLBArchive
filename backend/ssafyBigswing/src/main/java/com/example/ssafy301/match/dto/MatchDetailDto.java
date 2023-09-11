package com.example.ssafy301.match.dto;

import com.example.ssafy301.matchDetail.domain.MatchDetail;
import jakarta.persistence.Column;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

@Data
public class MatchDetailDto {

    private Long id;
    private Long matchId;
    private String linescore;
    private String boxscore;

    public MatchDetailDto(MatchDetail matchDetail) {
        this.id = matchDetail.getId();
        this.matchId = matchDetail.getMatchId();
        this.linescore = matchDetail.getLinescore();
        this.boxscore = matchDetail.getBoxscore();
    }
}
