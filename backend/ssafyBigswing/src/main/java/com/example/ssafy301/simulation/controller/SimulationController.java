package com.example.ssafy301.simulation.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.match.dto.MatchDto;
import com.example.ssafy301.simulation.dto.SimulationMembersJsonDto;
import com.example.ssafy301.simulation.dto.SimulationResponseDto;
import com.example.ssafy301.seasonRoster.dto.SeasonRosterDto;
import com.example.ssafy301.simulation.dto.PlayerSearchRespDto;
import com.example.ssafy301.simulation.dto.SimulationMembersDto;
import com.example.ssafy301.simulation.dto.SimulationPlayerSearchDto;
import com.example.ssafy301.simulation.service.SimulationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/simulation")
@RequiredArgsConstructor
public class SimulationController {

    private final SimulationService simulationService;
    
    // 시뮬레이션 추천
    @GetMapping("/recommend")
    public ResponseEntity getRecommendation(@RequestHeader("refreshToken") String refreshToken) {
        List<MatchDto> result = simulationService.getRecommendedSimulations(refreshToken);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }

    // 경기에 참여한 팀들의 선수 목록 반환
    @GetMapping("/teamlist/{matchId}")
    public ResponseEntity getSimulationTeam(@PathVariable Long matchId) {
        SimulationMembersJsonDto result = simulationService.getSimulationMembersByMatchId(matchId);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }

    @GetMapping("/members/{matchId}")
    public ResponseEntity getSimulationMembers(@PathVariable Long matchId) {
        SimulationMembersJsonDto simulationMembers = simulationService.getSimulationMembersByMatchId(matchId);
        SimulationResponseDto result = simulationService.getFilteredMembers(simulationMembers);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }

    // 교체할 선수 목록 검색
    @GetMapping("/playersearch")
    public ResponseEntity getReplacementList(@ModelAttribute SimulationPlayerSearchDto searchDto) {
        PlayerSearchRespDto result = simulationService.getReplacementList(searchDto);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }
}
