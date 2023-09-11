package com.example.ssafy301.teamStat.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.teamStat.domain.TeamStat;
import com.example.ssafy301.teamStat.dto.TeamStatDto;
import com.example.ssafy301.teamStat.dto.TeamStatReqDto;
import com.example.ssafy301.teamStat.repository.TeamStatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TeamStatService {

    private final TeamStatRepository teamStatRepository;

    // 구체적인 팀의 스탯 확인
    public TeamStatDto getTeamDetailStat(TeamStatReqDto teamStatReqDto) {
        TeamStat result = teamStatRepository.getTeamStatByTeamIdAndSeason(teamStatReqDto.getTeamId(), teamStatReqDto.getSeason());

        if(result == null) {
            throw new NotFoundException(FailCode.NO_TEAM_STAT);
        }

        return new TeamStatDto(result);
    }
}
