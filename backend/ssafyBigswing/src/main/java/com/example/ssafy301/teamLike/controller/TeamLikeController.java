package com.example.ssafy301.teamLike.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.teamLike.domain.TeamLike;
import com.example.ssafy301.teamLike.dto.TeamLikeDto;
import com.example.ssafy301.teamLike.service.TeamLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/teamlike")
public class TeamLikeController {

    private final TeamLikeService teamLikeService;
    
    // 좋아하는 팀 목록 가져오기
    @GetMapping("/{userId}")
    public ResponseEntity getLikeTeams(@PathVariable("userId") Long userId) {
        List<TeamLikeDto> result = teamLikeService.getLikeTeamList(userId);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }

    @PostMapping("/like")
    public ResponseEntity addTeamLike(@RequestHeader("refreshToken") String refreshToken,
                                                   @RequestBody Map<String, Long> payload) {
        teamLikeService.saveTeamLike(refreshToken, payload.get("teamId"));
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS);
    }
}
