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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static com.example.ssafy301.player.domain.QPlayer.player;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final SeasonRosterRepository seasonRosterRepository;
    private final JPAQueryFactory queryFactory;

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

        JPAQuery<PlayerDto> playerQuery = queryFactory
                .select(new QPlayerDto(
                        player
                ))
                .from(player)
                .where(playerNameStartsWith(firstletter))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());
        
        // 플레이어 정보가 없다면 예외 발생
        List<PlayerDto> players = playerQuery.fetch();
        if(players == null || players.isEmpty()) {
            throw new NotFoundException(FailCode.NO_PLAYERS);
        }


        return PageableExecutionUtils.getPage(players, pageable, playerQuery::fetchCount);
    }

    private BooleanExpression playerNameStartsWith(char firstletter) {
        return player.name.substring(0,1).equalsIgnoreCase(String.valueOf(firstletter));
    }
    
    // 문자열 검색으로 선수 검색
    public Page<PlayerDto> searchPlayerByName(Pageable pageable, String content) {
        JPAQuery<PlayerDto> playerQuery = queryFactory
                .select(new QPlayerDto(
                        player
                ))
                .from(player)
                .where(playernameContains(content))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize());

        // 플레이어 정보가 없다면 예외 발생
        List<PlayerDto> players = playerQuery.fetch();
        if(players == null || players.isEmpty()) {
            throw new NotFoundException(FailCode.NO_PLAYERS);
        }

        return PageableExecutionUtils.getPage(players, pageable, playerQuery::fetchCount);
    }

    private BooleanExpression playernameContains(String content) {
        String lowerContent = content.toLowerCase();
        return player.name.toLowerCase().contains(lowerContent).or(player.korName.contains(content));
    }
}
