package com.example.ssafy301.seasonRoster.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.seasonRoster.domain.SeasonRoster;
import com.example.ssafy301.seasonRoster.dto.SeasonRosterDto;
import com.example.ssafy301.seasonRoster.dto.SeasonRosterReqDto;
import com.example.ssafy301.seasonRoster.repository.SeasonRosterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SeasonRosterService {

    private final SeasonRosterRepository seasonRosterRepository;
    
    // teamId와 season에 맞는 선수명단을 가져옴
    public List<SeasonRosterDto> getSeasonRosterList(SeasonRosterReqDto seasonRosterReqDto) {
        List<SeasonRoster> result = seasonRosterRepository.getSeasonRostersByTeamIdAndSeason(seasonRosterReqDto.getTeamId(), seasonRosterReqDto.getSeason());

        if (result == null || result.size() == 0) {
            throw new NotFoundException(FailCode.NO_SEASONROSTER);
        }

        return result.stream().map((seasonRoster) ->
                new SeasonRosterDto(seasonRoster)).collect(Collectors.toList());
    }
}
