package com.example.ssafy301.match.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.match.domain.Match;
import com.example.ssafy301.match.dto.MatchDetailDto;
import com.example.ssafy301.match.dto.MatchDto;
import com.example.ssafy301.match.repository.MatchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MatchService {

    private final MatchRepository matchRepository;
    
    // 오늘 있는 경기 목록 조회
    // 시간 순으로 정렬하기
    public List<MatchDto> getTodayMatches() {
        LocalDate now = LocalDate.now();
        
        // 경기 목록을 전부 가져오기
        List<Match> AllMatches = matchRepository.findAll();

        // 우선 오늘 있는 경기만 분류할 것
        List<Match> currentMatches = AllMatches.stream()
                .filter(match ->
                    match.getMatchDate().toLocalDate().isEqual(now)
                ).collect(Collectors.toList());

        // 경기가 없으면 예외 발생
        if(currentMatches == null || currentMatches.size() == 0) {
            throw new NotFoundException(FailCode.NO_MATCH);
        }

        // 시간 순으로 정렬할 것
        Collections.sort(currentMatches, (match1, match2) -> match1.getMatchDate().compareTo(match2.getMatchDate()));

        // 시간 순으로 정렬 됐으니
        // MatchDto로 변환하여 반환할것
        return currentMatches.stream().map(match ->
            new MatchDto(match)
        ).collect(Collectors.toList());
    }

    // 경기 결과 상세 조회
    public MatchDetailDto getMatchById(Long id) {
        Match match = matchRepository.findById(id).orElseThrow(() -> new NotFoundException(FailCode.NO_MATCH));
        return new MatchDetailDto(match);
    }

    // 경기 검색
}
