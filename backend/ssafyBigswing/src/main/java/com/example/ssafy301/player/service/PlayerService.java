package com.example.ssafy301.player.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.player.domain.Player;
import com.example.ssafy301.player.dto.PlayerDetailDto;
import com.example.ssafy301.player.dto.PlayerDto;
import com.example.ssafy301.player.dto.QPlayerDto;
import com.example.ssafy301.player.repository.PlayerRepository;
import com.example.ssafy301.seasonRoster.domain.SeasonRoster;
import com.example.ssafy301.seasonRoster.repository.SeasonRosterRepository;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.text.similarity.FuzzyScore;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import static com.example.ssafy301.player.domain.QPlayer.player;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final SeasonRosterRepository seasonRosterRepository;
    private final JPAQueryFactory queryFactory;
    private FuzzyScore fuzzyScore = new FuzzyScore(Locale.ENGLISH);
    // 선수 상세정보 조회
    public PlayerDetailDto getDetailPlayer(Long playerId) {
        Player player = playerRepository.findById(playerId).orElseThrow(() -> new NotFoundException(FailCode.NO_PLAYER));

        // 해당 선수가 활동했던 연도도 보내주자
        List<Integer> activeYears = seasonRosterRepository.getSeasonRostersByPlayerId(playerId)
                .stream()
                .map(SeasonRoster::getSeason) // SeasonRoster에서 연도만 추출
                .distinct() // 중복 제거
                .collect(Collectors.toList()); // List<Integer>로 변환

        return new PlayerDetailDto(player, activeYears);
    }

    // 첫 영문자로 선수 검색
    public Page<PlayerDto> searchPlayerByFirstletter(Pageable pageable, char firstletter) {

        List<PlayerDto> players = queryFactory
                .select(new QPlayerDto(
                        player
                ))
                .from(player)
                .where(playerNameStartsWith(firstletter))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        // 플레이어 정보가 없다면 예외 발생
        if(players == null || players.isEmpty()) {
            throw new NotFoundException(FailCode.NO_PLAYERS);
        }

        JPAQuery<Long> countQuery = queryFactory
                .select(player.count())
                .from(player)
                .where(playerNameStartsWith(firstletter));


        return PageableExecutionUtils.getPage(players, pageable, countQuery::fetchOne);
    }

    private BooleanExpression playerNameStartsWith(char firstletter) {
        return player.name.substring(0,1).equalsIgnoreCase(String.valueOf(firstletter));
    }
    
    // 문자열 검색으로 선수 검색
//    public Page<PlayerDto> searchPlayerByName(Pageable pageable, String content) {
//        List<PlayerDto> players = queryFactory
//                .select(new QPlayerDto(
//                        player
//                ))
//                .from(player)
//                .where(playernameContains(content.trim()))
//                .offset(pageable.getOffset())
//                .limit(pageable.getPageSize())
//                .fetch();
//
//        // 플레이어 정보가 없다면 예외 발생
//        if(players == null || players.isEmpty()) {
//            throw new NotFoundException(FailCode.NO_PLAYERS);
//        }
//
//        JPAQuery<Long> countQuery = queryFactory
//                .select(player.count())
//                .from(player)
//                .where(playernameContains(content.trim()));
//
//        return PageableExecutionUtils.getPage(players, pageable, countQuery::fetchOne);
//    }
    public Page<PlayerDto> searchPlayerByName(Pageable pageable, String content) {
        // 모든 선수 불러오기
        List<PlayerDto> allPlayers = queryFactory
                .select(new QPlayerDto(player))
                .from(player)
                .fetch();

        List<PlayerDto> filteredPlayers;

        // content에 한글이 포함되어 있는지 체크
        if (content.matches(".*[가-힣].*")) {
            // 한글이 포함된 경우 korName으로만 퍼지 검색
            filteredPlayers = allPlayers.stream()
                    .filter(playerDto -> fuzzyScore.fuzzyScore(playerDto.getKorName(), content.trim()) > 8)
                    .sorted(Comparator.comparingInt((PlayerDto playerDto) -> fuzzyScore.fuzzyScore(playerDto.getKorName(), content.trim())).reversed())
                    .collect(Collectors.toList());
        } else {
            // 한글이 포함되지 않은 경우 name으로만 퍼지 검색
            filteredPlayers = allPlayers.stream()
                    .filter(playerDto -> fuzzyScore.fuzzyScore(playerDto.getName(), content.trim()) > 8)
                    .sorted(Comparator.comparingInt((PlayerDto playerDto) -> fuzzyScore.fuzzyScore(playerDto.getName(), content.trim())).reversed())
                    .collect(Collectors.toList());
        }

        log.debug("이름으로 검색 해보자 이말이야");

        // 플레이어 정보가 없다면 예외 발생
        if (filteredPlayers.isEmpty()) {
            throw new NotFoundException(FailCode.NO_PLAYERS);
        }

        // 페이징 처리
        int start = (int) pageable.getOffset();
        int end = (start + pageable.getPageSize()) > filteredPlayers.size() ? filteredPlayers.size() : (start + pageable.getPageSize());
        return new PageImpl<>(filteredPlayers.subList(start, end), pageable, filteredPlayers.size());
    }
    private BooleanExpression playernameContains(String content) {
        String lowerContent = content.toLowerCase();
        return player.name.toLowerCase().contains(lowerContent).or(player.korName.contains(content));
    }
}
