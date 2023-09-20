package com.example.ssafy301.playerLike.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.playerLike.domain.PlayerLike;
import com.example.ssafy301.playerLike.dto.PlayerLikeDto;
import com.example.ssafy301.playerLike.service.PlayerLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/playerlike")
public class PlayerLikeController {

    private final PlayerLikeService playerLikeService;
    
    // 좋아하는 선수 목록 가져오기
    @GetMapping("/{userId}")
    public ResponseEntity getLikePlayers(@PathVariable("userId") Long userId) {
        List<PlayerLikeDto> result = playerLikeService.getLikePlayerList(userId);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }

    @PostMapping("/like")
    public ResponseEntity<PlayerLike> likePlayer(@RequestHeader("refreshToken") String refreshToken, @RequestBody Map<String, Long> payload) {
        Long playerId = payload.get("playerId");
        PlayerLike result = playerLikeService.savePlayerLike(refreshToken, playerId);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }
}
