package com.example.ssafy301.hitting.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.hitting.domain.Hitting;
import com.example.ssafy301.hitting.dto.HittingReqDto;
import com.example.ssafy301.hitting.dto.HittingRespDto;
import com.example.ssafy301.hitting.repository.HittingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HittingService {

    private final HittingRepository hittingRepository;
    
    // playerId와 season을 입력해서, 관련된 stat 정보를 가져온다
    public HittingRespDto getHittingStat(HittingReqDto hittingReqDto) {
        Hitting hittingStat = hittingRepository.getHittingByPlayerIdAndSeason(hittingReqDto.getPlayerId(), hittingReqDto.getSeason());
        
        // 입력된 선수와 시즌과 관련된 스탯이 없다면 예외 발생
        if(hittingStat == null) {
            throw new NotFoundException(FailCode.NO_HITTING_STAT);
        }

        return new HittingRespDto(hittingStat);
    }

}
