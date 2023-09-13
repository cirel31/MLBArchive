package com.example.ssafy301.team.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.team.dto.TeamDto;
import com.example.ssafy301.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/team")
@RequiredArgsConstructor
public class TeamController {

    private TeamService teamService;
    
    // 전체 팀 리스트 가져오기
    @GetMapping("/list")
    public ResponseEntity getAllTeams() {
        List<TeamDto> result = teamService.getAllTeams();
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS,result);
    }
    
    // 특정 팀의 정보 가져오기
    @GetMapping("/detail/{teamId}")
    public ResponseEntity getTeamDetail(@PathVariable("teamId") Long teamId){
        TeamDto result = teamService.getTeamDetail(teamId);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS,result);
    }
}
