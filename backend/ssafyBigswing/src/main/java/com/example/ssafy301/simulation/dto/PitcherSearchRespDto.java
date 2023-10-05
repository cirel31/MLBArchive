package com.example.ssafy301.simulation.dto;

import com.example.ssafy301.pitching.dto.PitchingRespDto;
import com.example.ssafy301.player.domain.Player;
import com.example.ssafy301.player.domain.Position;
import com.example.ssafy301.player.domain.UseHand;
import lombok.Data;

import java.time.LocalDate;

@Data
public class PitcherSearchRespDto {

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

    public PitcherSearchRespDto(Player player, PitchingRespDto pitching) {
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
    }
}
