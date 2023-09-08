package com.example.ssafy301.playerLike.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.playerLike.dto.PlayerLikeDto;
import com.example.ssafy301.playerLike.service.PlayerLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/playerlike")
public class PlayerLikeController {

    private final PlayerLikeService playerLikeService;
    
    // 좋아하는 선수 목록 가져오기
    @GetMapping("/{userId}")
    public ResponseEntity getLikePlayers(@PathVariable("userId") Long userId) {
        List<PlayerLikeDto> likePlayerList = playerLikeService.getLikePlayerList(userId);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, likePlayerList);
    }
}
