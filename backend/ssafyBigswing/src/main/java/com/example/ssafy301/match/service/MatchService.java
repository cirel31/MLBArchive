package com.example.ssafy301.match.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.match.domain.Match;
import com.example.ssafy301.match.dto.MatchDetailDto;
import com.example.ssafy301.match.dto.MatchDto;
import com.example.ssafy301.match.dto.MatchSearchDto;
import com.example.ssafy301.match.dto.QMatchDto;
import com.example.ssafy301.match.repository.MatchRepository;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import static com.example.ssafy301.match.domain.QMatch.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MatchService {

    private final MatchRepository matchRepository;
    private final JPAQueryFactory queryFactory;

    
    // 오늘 있는 경기 목록 조회
    // 시간 순으로 정렬하기
    public List<MatchDto> getTodayMatches() {
        LocalDate now = LocalDate.now();
        
//        // 경기 목록을 전부 가져오기
//        List<Match> AllMatches = matchRepository.findAll();
//
//        // 우선 오늘 있는 경기만 분류할 것
//        List<Match> currentMatches = AllMatches.stream()
//                .filter(match ->
//                    match.getMatchDate().toLocalDate().isEqual(now)
//                ).collect(Collectors.toList());

        // 오늘 있는 매치만 가져오자
        List<MatchDto> currentMatches = queryFactory
                .select(new QMatchDto(
                        match
                ))
                .from(match)
                .where(matchDateEq(now))
                .orderBy(match.matchDate.asc())
                .fetch();


        // 경기가 없으면 예외 발생
        if(currentMatches == null || currentMatches.size() == 0) {
            throw new NotFoundException(FailCode.NO_MATCHES);
        }

        // 시간 순으로 정렬할 것
//        Collections.sort(currentMatches, (match1, match2) -> match1.getMatchDate().compareTo(match2.getMatchDate()));

        // 시간 순으로 정렬 됐으니
        // MatchDto로 변환하여 반환할것
        return currentMatches;
    }

    private BooleanExpression matchDateEq(LocalDate now) {
        return match.matchDate.year().eq(now.getYear())
                .and(match.matchDate.month().eq(now.getMonthValue()))
                .and(match.matchDate.dayOfMonth().eq(now.getDayOfMonth()));
    }

    // 경기 결과 상세 조회
    public MatchDetailDto getMatchById(Long id) {
        Match match = matchRepository.findById(id).orElseThrow(() -> new NotFoundException(FailCode.NO_MATCH));
        return new MatchDetailDto(match);
    }

    // 경기 검색
    public Page<MatchDto> searchMatch(Pageable pageable, MatchSearchDto searchDto) {
        List<MatchDto> matchList = queryFactory
                .select(new QMatchDto(match))
                .from(match)
                .where(matchTeam(searchDto),
                        matchDateIn(searchDto))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        // 경기가 없으면 예외발생
        if(matchList == null || matchList.size() == 0) {
            throw new NotFoundException(FailCode.NO_MATCHES);
        }

        JPAQuery<Long> countQuery = queryFactory
                .select(match.count())
                .from(match)
                .where(matchTeam(searchDto),
                        matchDateIn(searchDto));

        return PageableExecutionUtils.getPage(matchList, pageable, countQuery::fetchOne);
    }

    private BooleanExpression matchDateIn(MatchSearchDto searchDto) {
        // 입력 기간 내의 경기목록
        return match.matchDate.between(searchDto.getStart().atStartOfDay(), searchDto.getEnd().atTime(LocalTime.MAX));
    }

    private BooleanExpression matchTeam(MatchSearchDto searchDto) {
        // 팀 이름 같은 것을 가져옴
        return match.homeName.eq(searchDto.getTeamName()).or(match.awayName.eq(searchDto.getTeamName()));
    }
}
