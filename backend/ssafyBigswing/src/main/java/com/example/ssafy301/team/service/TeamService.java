package com.example.ssafy301.team.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.seasonRoster.domain.SeasonRoster;
import com.example.ssafy301.seasonRoster.repository.SeasonRosterRepository;
import com.example.ssafy301.team.domain.Team;
import com.example.ssafy301.team.dto.TeamDetailDto;
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
    private final SeasonRosterRepository seasonRosterRepository;

    // 모든 팀 리스트
    // DB에는 현재 존재하는 팀의 정보만 들어있음
    public List<TeamDto> getAllTeams() {
//        int currentYear = LocalDate.now().getYear();
//
//        // 현재 년도를 기준으로 모든 SeasonRoster 정보를 가져온 뒤
//        List<SeasonRoster> seasonRostersBySeason = seasonRosterRepository.getSeasonRostersBySeason(currentYear);
//
//        // 겹치지 않는 teamId만 HashSet에 담아줌
//        Set<Long> currentSeasonTeamIds = new HashSet<>();
//        seasonRostersBySeason
//                .forEach(seasonRoster -> currentSeasonTeamIds.add(seasonRoster.getTeam().getId()));
//
//        // 해당 teamId를 바탕으로 기본 팀 정보를 가져옴
//        List<TeamDto> currentTeams = new ArrayList<>();
//        currentSeasonTeamIds
//                .forEach(teamId -> currentTeams.add(this.getTeamDetail(teamId)));
//
//        return currentTeams;

        List<Team> all = teamRepository.findAll();
        List<TeamDto> result = all.stream()
                .map(team -> new TeamDto(team))
                .collect(Collectors.toList());

        return result;
    }

    // 팀의 구체적인 정보
    public TeamDetailDto getTeamDetail(Long teamId) {
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new NotFoundException(FailCode.NO_TEAM));
        
        // 해당 팀이 활동한 연도도 보내주자
        List<Integer> activeYears = team
                .getTeamStats()
                .stream()
                .map(stat ->
                        stat.getSeason())
                .collect(Collectors.toList());// List<Integer>로 변환

        return new TeamDetailDto(team, activeYears);
    }
}
