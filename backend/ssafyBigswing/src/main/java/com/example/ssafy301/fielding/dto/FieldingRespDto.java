package com.example.ssafy301.fielding.dto;

import com.example.ssafy301.fielding.domain.Fielding;
import com.example.ssafy301.player.domain.Position;
import lombok.Data;

@Data
public class FieldingRespDto {

    private Long id;
    private Long playerId;
    private int season;
    private int error;
    private int assist;
    private int putout;
    private int gamesPlayed;
    private Position position;

    public FieldingRespDto(Fielding fielding) {
        this.id = fielding.getId();
        this.playerId = fielding.getPlayerId();
        this.season = fielding.getSeason();
        this.error = fielding.getError();
        this.assist = fielding.getAssist();
        this.putout = fielding.getPutout();
        this.gamesPlayed = fielding.getGamesPlayed();
        this.position = fielding.getPosition();
    }
}
