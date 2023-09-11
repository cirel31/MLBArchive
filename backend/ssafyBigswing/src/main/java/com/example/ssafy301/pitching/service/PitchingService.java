package com.example.ssafy301.pitching.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.pitching.domain.Pitching;
import com.example.ssafy301.pitching.dto.PitchingReqDto;
import com.example.ssafy301.pitching.dto.PitchingRespDto;
import com.example.ssafy301.pitching.repository.PitchingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PitchingService {

    private final PitchingRepository pitchingRepository;
    
    // playerId와 season을 입력해서, 관련된 stat 정보를 가져온다
    public PitchingRespDto getPitchingStat(PitchingReqDto pitchingReqDto) {
        Pitching pitchingStat = pitchingRepository.getPitchingByPlayerIdAndSeason(pitchingReqDto.getPlayerId(), pitchingReqDto.getSeason());
        
        // 입력된 선수와 시즌과 관련된 스탯이 없다면 예외 발생
        if(pitchingStat == null) {
            throw new NotFoundException(FailCode.NO_PITCHING_STAT);
        }

        return new PitchingRespDto(pitchingStat);
    }

}
