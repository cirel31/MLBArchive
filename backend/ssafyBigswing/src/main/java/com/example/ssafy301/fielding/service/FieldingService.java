package com.example.ssafy301.fielding.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.fielding.domain.Fielding;
import com.example.ssafy301.fielding.dto.FieldingReqDto;
import com.example.ssafy301.fielding.dto.FieldingRespDto;
import com.example.ssafy301.fielding.repository.FieldingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FieldingService {

    private final FieldingRepository fieldingRepository;
    
    // playerId와 season을 입력해서, 관련된 stat 정보를 가져온다
    public FieldingRespDto getFieldingStat(FieldingReqDto fieldingReqDto) {
        List<Fielding> fieldingStats = fieldingRepository.getFieldingsByPlayerIdAndSeason(fieldingReqDto.getPlayerId(), fieldingReqDto.getSeason());
        
        // 입력된 선수와 시즌과 관련된 스탯이 없다면 예외 발생
        if(fieldingStats.isEmpty()) {
            throw new NotFoundException(FailCode.NO_FIELDING_STAT);
        }

        Fielding mostPlayedFielding = Collections.max(fieldingStats, Comparator.comparingInt(Fielding::getGamesPlayed));

        return new FieldingRespDto(mostPlayedFielding);
    }

}
