package com.example.ssafy301.matchDetail.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.matchDetail.domain.MatchDetail;
import com.example.ssafy301.matchDetail.dto.MatchDetailDto;
import com.example.ssafy301.matchDetail.repository.MatchDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MatchDetailService {

    private final MatchDetailRepository matchDetailRepository;

    // 특정 경기의 박스스코어 & 라인스코어 확인
    public MatchDetailDto getMatchDetail(Long matchId) {
        MatchDetail matchDetail = matchDetailRepository.findById(matchId).orElseThrow(() -> new NotFoundException(FailCode.NO_MATCH));
        return new MatchDetailDto(matchDetail);
    }
}
