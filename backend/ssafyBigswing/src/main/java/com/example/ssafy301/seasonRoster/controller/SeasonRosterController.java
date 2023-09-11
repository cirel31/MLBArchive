package com.example.ssafy301.seasonRoster.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.seasonRoster.dto.SeasonRosterDto;
import com.example.ssafy301.seasonRoster.dto.SeasonRosterReqDto;
import com.example.ssafy301.seasonRoster.service.SeasonRosterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/roster")
@RequiredArgsConstructor
public class SeasonRosterController {

    private final SeasonRosterService seasonRosterService;
    
    // 팀id와 시즌에 기반하여 팀 멤버 명단 가져오기
    @GetMapping("/list")
    public ResponseEntity getSeasonRosterList(@RequestBody SeasonRosterReqDto seasonRosterReqDto) {
        List<SeasonRosterDto> result = seasonRosterService.getSeasonRosterList(seasonRosterReqDto);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }
}
