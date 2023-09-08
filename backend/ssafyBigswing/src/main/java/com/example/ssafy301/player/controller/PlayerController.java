package com.example.ssafy301.player.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.player.dto.PlayerDto;
import com.example.ssafy301.player.service.PlayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/player")
public class PlayerController {

    private final PlayerService playerService;

    // 선수 상세보기
    @GetMapping("/detail/{playerId}")
    public ResponseEntity getDetailPlayer(@PathVariable("playerId") Long playerId) {
        PlayerDto result = playerService.getDetailPlayer(playerId);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }
}
