package com.example.ssafy301.teamStat.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.teamStat.dto.TeamStatDto;
import com.example.ssafy301.teamStat.dto.TeamStatReqDto;
import com.example.ssafy301.teamStat.service.TeamStatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/teamstat")
@RequiredArgsConstructor
public class TeamStatController {
    private final TeamStatService teamStatService;

    // 구체적인 팀의 스탯 가져오기
    @GetMapping("/detail")
    public ResponseEntity getDetailTeamStat(@RequestBody TeamStatReqDto teamStatReqDto) {
        TeamStatDto result = teamStatService.getTeamDetailStat(teamStatReqDto);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }
}
