package com.example.ssafy301.simulation.dto;

import lombok.Data;

@Data
public class SimulationPlayerSearchDto {
    private Long playerId; // 교체될 선수의 아이디
    private String content; // 교체할 선수 이름 관련 검색 내용
    private Long teamId; // 검색한 팀
    private int season; // 검색한 시즌
}
