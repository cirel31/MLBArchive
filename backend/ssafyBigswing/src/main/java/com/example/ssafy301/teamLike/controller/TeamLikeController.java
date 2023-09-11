package com.example.ssafy301.teamLike.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.playerLike.dto.PlayerLikeDto;
import com.example.ssafy301.playerLike.service.PlayerLikeService;
import com.example.ssafy301.teamLike.dto.TeamLikeDto;
import com.example.ssafy301.teamLike.service.TeamLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/teamlike")
public class TeamLikeController {

    private final TeamLikeService teamLikeService;
    
    // 좋아하는 팀 목록 가져오기
    @GetMapping("/{userId}")
    public ResponseEntity getLikeTeams(@PathVariable("userId") Long userId) {
        List<TeamLikeDto> likeTeamList = teamLikeService.getLikeTeamList(userId);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, likeTeamList);
    }
}
