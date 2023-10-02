package com.example.ssafy301.simulation.dto;

import com.example.ssafy301.hitting.domain.Hitting;
import com.example.ssafy301.pitching.domain.Pitching;
import com.example.ssafy301.player.domain.Player;
import com.example.ssafy301.player.domain.Position;
import com.example.ssafy301.player.domain.UseHand;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TwoWayRespDto {

    // 선수 관련 정보
    private Long playerId;
    private String name;
    private String korName;
    private boolean isPlaying;
    private int height;
    private int weight;
    private Position mainPosition; // 주포지션
    private UseHand mainHand;
    private String image;
    private LocalDate debutDate;
    private LocalDate retireDate;
    private String hometown;
    private int backnumber;

    // 피칭 정보
    private float era;
    private float whip;

    // 히팅 정보
    private float batting_avg;
    private float ops;

    public TwoWayRespDto(Player player, Pitching pitching, Hitting hitting) {
        this.playerId = player.getId();
        this.name = player.getName();
        this.korName = player.getKorName();
        this.isPlaying = player.isPlaying();
        this.height = player.getHeight();
        this.weight = player.getWeight();
        this.mainPosition = player.getMainPosition(); // 주포지션
        this.mainHand = player.getMainHand();
        this.image = player.getImage();
        this.debutDate = player.getDebutDate();
        this.retireDate = player.getRetireDate();
        this.hometown = player.getHometown();
        this.backnumber = player.getBacknumber();

        this.era = pitching.getEra();
        this.whip = pitching.getWhip();

        this.batting_avg = hitting.getBattingAvg();
        this.ops = hitting.getOps();
    }
}
