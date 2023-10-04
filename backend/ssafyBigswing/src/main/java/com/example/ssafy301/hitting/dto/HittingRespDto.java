package com.example.ssafy301.hitting.dto;

import com.example.ssafy301.hitting.domain.Hitting;
import lombok.Data;

@Data
public class HittingRespDto {

    private Long id;
    private int season;
    private int gamesPlayed;
    private float battingAvg;
    private float sluggingAvg;
    private float OBP;
    private int hits;
    private int runs;
    private int RBI;
    private int homerun;
    private int stolenbases;
    private float ops;
    private float wrc;
    private float war;

    public HittingRespDto(Hitting hitting) {
        this.id = hitting.getId();
        this.season = hitting.getSeason();
        this.gamesPlayed = hitting.getGamesPlayed();
        this.battingAvg = hitting.getBattingAvg();
        this.sluggingAvg = hitting.getSluggingAvg();
        this.OBP = hitting.getOBP();
        this.hits = hitting.getHits();
        this.runs = hitting.getRuns();
        this.RBI = hitting.getRBI();
        this.homerun = hitting.getHomerun();
        this.stolenbases = hitting.getStolenbases();
        this.ops = hitting.getOps();
        this.wrc = hitting.getWrc();
        this.war = hitting.getWar();
    }
}
