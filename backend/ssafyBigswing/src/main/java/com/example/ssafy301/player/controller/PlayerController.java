package com.example.ssafy301.player.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.player.dto.PlayerDetailDto;
import com.example.ssafy301.player.dto.PlayerDto;
import com.example.ssafy301.player.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/player")
public class PlayerController {

    private final PlayerService playerService;

    // 선수 상세보기
    @GetMapping("/detail/{playerId}")
    public ResponseEntity getDetailPlayer(@PathVariable("playerId") Long playerId) {
        PlayerDetailDto result = playerService.getDetailPlayer(playerId);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }
    
    // 첫 영문자로 선수 검색
    @GetMapping("/search/firstletter/{firstletter}")
    public ResponseEntity searchPlayerByFirstletter(Pageable pageable, @PathVariable("firstletter") char firstletter) {
        Page<PlayerDto> result = playerService.searchPlayerByFirstletter(pageable, firstletter);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }
    
    // 2글자 이상의 문자열로 선수 검색
    @GetMapping("/search/content/{content}")
    public ResponseEntity searchPlayerByName(Pageable pageable, @PathVariable("content") String content) {
        Page<PlayerDto> result = playerService.searchPlayerByName(pageable, content);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }
}
