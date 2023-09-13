package com.example.ssafy301.pitching.dto;

import com.example.ssafy301.pitching.domain.Pitching;
import lombok.Data;

@Data
public class PitchingRespDto {

    private Long id;
    private int season;
    private int gamesPlayed;
    private float inningsPlayed;
    private int win;
    private int lose;
    private float era;
    private int save;
    private float whip;
    private float kbb;
    private int blownsave;

    public PitchingRespDto(Pitching pitching) {
        this.id = pitching.getId();
        this.season = pitching.getSeason();
        this.gamesPlayed = pitching.getGamesPlayed();
        this.inningsPlayed = pitching.getInningsPlayed();
        this.win = pitching.getWin();
        this.lose = pitching.getLose();
        this.era = pitching.getEra();
        this.save = pitching.getSave();
        this.whip = pitching.getWhip();
        this.kbb = pitching.getKbb();
        this.blownsave = pitching.getBlownsave();
    }
}
