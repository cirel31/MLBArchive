package com.example.ssafy301.matchDetail.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.matchDetail.dto.MatchDetailDto;
import com.example.ssafy301.matchDetail.service.MatchDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/matchdetail")
public class MatchDetailController {

    private final MatchDetailService matchDetailService;

    // 특정 경기의 박스스코어 & 라인스코어 확인
    @GetMapping("/score/{matchId}")
    public ResponseEntity getMatchScore(@PathVariable("matchId") Long matchId) {
        MatchDetailDto result = matchDetailService.getMatchDetail(matchId);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }
}
