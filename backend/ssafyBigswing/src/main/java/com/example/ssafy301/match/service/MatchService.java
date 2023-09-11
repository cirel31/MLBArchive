package com.example.ssafy301.match.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.match.domain.Match;
import com.example.ssafy301.match.dto.MatchDto;
import com.example.ssafy301.match.repository.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MatchService {

    private final MatchRepository matchRepository;

    // 경기 결과 상세 조회
    public MatchDto getMatchById(Long id) {
        Match match = matchRepository.findById(id).orElseThrow(() -> new NotFoundException(FailCode.NO_MATCH));
        return new MatchDto(match);
    }

    // 경기 검색
}
