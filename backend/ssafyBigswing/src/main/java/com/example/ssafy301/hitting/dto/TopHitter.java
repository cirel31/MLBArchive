package com.example.ssafy301.hitting.dto;

import com.example.ssafy301.hitting.domain.Hitting;
import lombok.Data;

@Data
public class TopHitter {

    // 선수 id, 선수사진, 선수이름(영어,한국), 타율을 반환
    private Long playerId;
    private String image;
    private String name;
    private String korName;
    private float battingAvg;

    public TopHitter(Hitting hitting) {
        this.playerId = hitting.getPlayer().getId();
        this.image = hitting.getPlayer().getImage();
        this.name = hitting.getPlayer().getName();
        this.korName = hitting.getPlayer().getKorName();
        this.battingAvg = hitting.getBattingAvg();
    }
}
