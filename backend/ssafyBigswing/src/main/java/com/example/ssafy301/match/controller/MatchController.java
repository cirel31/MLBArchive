package com.example.ssafy301.match.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.match.dto.MatchDto;
import com.example.ssafy301.match.repository.MatchRepository;
import com.example.ssafy301.match.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.example.ssafy301.common.api.status.SuccessCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/match")
public class MatchController {

    private final MatchService matchService;
    
    // 경기 결과 상세 조회
    @GetMapping("/detail/{matchId}")
    public ResponseEntity getDetailMatch(@PathVariable("matchId") Long matchId) {
        MatchDto result = matchService.getMatchById(matchId);
        return ResponseEntity.success(GENERAL_SUCCESS, result);
    }
    
    // 경기 검색(Querydsl 쓸까 고민중이어서 일단 보류)
}
