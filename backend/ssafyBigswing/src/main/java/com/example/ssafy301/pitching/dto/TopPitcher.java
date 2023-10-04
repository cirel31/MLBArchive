package com.example.ssafy301.pitching.dto;

import com.example.ssafy301.pitching.domain.Pitching;
import lombok.Data;

@Data
public class TopPitcher {

    // 선수id, 선수사진, 선수이름(영어, 한국), 방어율을 반환
    private Long playerId;
    private String image;
    private String name;
    private String korName;
    private float era;

    public TopPitcher(Pitching pitching) {
        this.playerId = pitching.getPlayer().getId();
        this.image = pitching.getPlayer().getImage();
        this.name = pitching.getPlayer().getName();
        this.korName = pitching.getPlayer().getKorName();
        this.era = pitching.getEra();
    }
}
