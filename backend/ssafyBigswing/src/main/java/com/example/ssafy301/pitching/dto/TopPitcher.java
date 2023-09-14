package com.example.ssafy301.pitching.dto;

import com.example.ssafy301.pitching.domain.Pitching;
import lombok.Data;

@Data
public class TopPitcher {

    // 선수사진, 선수이름, 방어율을 반환
    private String image;
    private String name;
    private float era;

    public TopPitcher(Pitching pitching) {
        this.image = pitching.getPlayer().getImage();
        this.name = pitching.getPlayer().getName();
        this.era = pitching.getEra();
    }
}
