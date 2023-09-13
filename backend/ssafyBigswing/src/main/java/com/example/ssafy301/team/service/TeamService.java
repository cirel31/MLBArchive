package com.example.ssafy301.team.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.team.domain.Team;
import com.example.ssafy301.team.dto.TeamDto;
import com.example.ssafy301.team.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;

    // 모든 팀 리스트
    public List<TeamDto> getAllTeams() {
        List<Team> all = teamRepository.findAll();
        return all.stream().map((team) ->
                new TeamDto(team))
                .collect(Collectors.toList());
    }

    // 팀의 구체적인 정보
    //
    public TeamDto getTeamDetail(Long id) {
        Team team = teamRepository.findById(id).orElseThrow(() -> new NotFoundException(FailCode.NO_TEAM));
        return new TeamDto(team);
    }
}
