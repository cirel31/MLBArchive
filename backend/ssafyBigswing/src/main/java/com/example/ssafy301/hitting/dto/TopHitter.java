package com.example.ssafy301.hitting.dto;

import com.example.ssafy301.hitting.domain.Hitting;
import lombok.Data;

@Data
public class TopHitter {

    // 선수사진, 선수이름, 타율을 반환
    private String image;
    private String name;
    private float battingAvg;

    public TopHitter(Hitting hitting) {
        this.image = hitting.getPlayer().getImage();
        this.name = hitting.getPlayer().getName();
        this.battingAvg = hitting.getBattingAvg();
    }
}
