package com.example.ssafy301.match.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.match.dto.MatchDetailDto;
import com.example.ssafy301.match.dto.MatchDto;
import com.example.ssafy301.match.dto.MatchSearchDto;
import com.example.ssafy301.match.service.MatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.ssafy301.common.api.status.SuccessCode.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/match")
public class MatchController {

    private final MatchService matchService;
    
    // 오늘 있는 경기 목록을 시간순으로 반환
    @GetMapping("/today")
    public ResponseEntity getTodayMatches() {
        List<MatchDto> todayMatches = matchService.getTodayMatches();
        return ResponseEntity.success(GENERAL_SUCCESS, todayMatches);
    }
    
    // 경기 결과 상세 조회
    @GetMapping("/detail/{matchId}")
    public ResponseEntity getDetailMatch(@PathVariable("matchId") Long matchId) {
        MatchDetailDto result = matchService.getMatchById(matchId);
        return ResponseEntity.success(GENERAL_SUCCESS, result);
    }
    
    // 경기 검색
    @GetMapping("/search")
    public ResponseEntity getMathesBySearchCondition(Pageable pageable, @RequestBody MatchSearchDto matchSearchDto) {
        Page<MatchDto> result = matchService.searchMatch(pageable, matchSearchDto);
        return ResponseEntity.success(GENERAL_SUCCESS, result);
    }
}
