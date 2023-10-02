package com.example.ssafy301.simulation.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.match.domain.Match;
import com.example.ssafy301.match.domain.MatchDetail;
import com.example.ssafy301.match.dto.MatchDetailDto;
import com.example.ssafy301.match.dto.MatchDto;
import com.example.ssafy301.match.dto.QMatchDto;
import com.example.ssafy301.match.repository.MatchDetailRepository;
import com.example.ssafy301.match.repository.MatchRepository;
import com.example.ssafy301.match.service.MatchService;
import com.example.ssafy301.seasonRoster.dto.SeasonRosterDto;
import com.example.ssafy301.seasonRoster.dto.SeasonRosterReqDto;
import com.example.ssafy301.seasonRoster.service.SeasonRosterService;
import com.example.ssafy301.simulation.dto.SimulationMembersDto;
import com.example.ssafy301.simulation.dto.SimulationMembersJsonDto;
import com.example.ssafy301.simulation.dto.SimulationMembersJsonDto.Player;
import com.example.ssafy301.simulation.dto.SimulationResponseDto;
import com.example.ssafy301.teamLike.dto.TeamLikeDto;
import com.example.ssafy301.user.service.UserService;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static com.example.ssafy301.match.domain.QMatch.match;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class SimulationService {

    private final MatchService matchService;
    private final SeasonRosterService seasonRosterService;
    private final UserService userService;
    private final JPAQueryFactory queryFactory;
    private final MatchRepository matchRepository;
    private final MatchDetailRepository matchDetailRepository;
    private final ObjectMapper objectMapper;
    // 시뮬레이션 추천
    // 내가 좋아하는 팀이 참여한 경기 중
    // 큰 점수 차로 진 경기를 보여주자
    public List<MatchDto> getRecommendedSimulations(String refreshToken) {

        TeamLikeDto likeTeam = userService.getLikedTeamsByRefreshToken(refreshToken).get(0);
        int currentYear = LocalDate.now().getYear();

        // 우선 내가 좋아하는 팀이 참가한 경기 리스트를 모두 가져오자
        List<MatchDto> myTeamMatches = queryFactory
                .select(new QMatchDto(
                        match
                ))
                .from(match)
                .where(
                        matchTeam(likeTeam.getTeamId()),
                        matchDateIn(currentYear - 1, currentYear))
                .fetch();

        // 경기가 없다면 예외 발생
        if(myTeamMatches == null || myTeamMatches.size() == 0) {
            throw new NotFoundException(FailCode.NO_MATCH);
        }

        // 그리고 내가 응원하는 팀이 진 경기를 가져오자
        List<MatchDto> loseMatches = new ArrayList<>();
        Long myTeamId = likeTeam.getTeamId();
        for (MatchDto myTeamMatch : myTeamMatches) {
            // 경기에서 내가 좋아하는 팀이 홈팀인 경우, 홈팀의 점수가 더 낮을 때 loseMatches에 넣어줌
            if((myTeamMatch.getHomeId() == myTeamId) && (myTeamMatch.getHomeScore() < myTeamMatch.getAwayScore())) {
                loseMatches.add(myTeamMatch);
            }
            // 경기에서 내가 좋아하는 팀이 어웨이팀인 경우, 어웨이팀의 점수가 더 낮을 때 loseMatches에 넣어줌
            else if ((myTeamMatch.getAwayId() == myTeamId) && (myTeamMatch.getAwayScore() < myTeamMatch.getHomeScore())) {
                loseMatches.add(myTeamMatch);
            }
        }

        // 작년부터 지금까지 진 경기가 없다면 예외 발생
        if(loseMatches.size() == 0) {
            throw new NotFoundException(FailCode.NO_LOSE_MATCH);
        }

        // 진 경기 중에 더 큰 차이로 진 Top5 경기를 반환해줌
        Collections.sort(loseMatches, new Comparator<MatchDto>() {
            @Override
            public int compare(MatchDto match1, MatchDto match2) {
                // 홈팀과 어웨이팀의 점수차가 클수록 앞에 위치
                int scoreDifference1 = Math.abs(match1.getHomeScore() - match1.getAwayScore());
                int scoreDifference2 = Math.abs(match2.getHomeScore() - match2.getAwayScore());

                return Integer.compare(scoreDifference2, scoreDifference1);
            }
        });

        List<MatchDto> topLoseMatches = loseMatches.subList(0, Math.min(5, loseMatches.size()));
        return topLoseMatches;
    }

    private BooleanExpression matchDateIn(int startYear, int endYear) {
        return match.matchDate.year().between(startYear, endYear);
    }

    private BooleanExpression matchTeam(Long teamId) {
        return match.homeId.eq(teamId).or(match.awayId.eq(teamId));
    }


    // 시뮬레이션 하고 싶은 경기를 선택하면
    // 해당 경기에 참여한 두 팀의 선수 목록을 보내줌
    public SimulationMembersDto getSimulationTeams(Long matchId) {
        MatchDetailDto match = matchService.getMatchById(matchId);
        List<SeasonRosterDto> homeMembers = seasonRosterService.getSeasonRosterList(new SeasonRosterReqDto(match.getHomeId(), match.getMatchDate().getYear()));
        List<SeasonRosterDto> awayMembers = seasonRosterService.getSeasonRosterList(new SeasonRosterReqDto(match.getAwayId(), match.getMatchDate().getYear()));
        return new SimulationMembersDto(homeMembers, awayMembers);
    }

    public SimulationMembersJsonDto getSimulationMembersByMatchId(Long matchId) {
        Match match = matchRepository.findById(matchId).orElseThrow(() -> new NotFoundException(FailCode.NO_MATCH));;
        MatchDetail matchDetail = matchDetailRepository.findById(match.getMatchDetailId()).orElseThrow(() -> new NotFoundException(FailCode.NO_MATCH));;
        log.debug("DTO Result: " + matchDetail.getMatchId()+" zzzz ",matchDetail.getId());
        if (matchDetail == null) {
            throw new NotFoundException(FailCode.NO_MATCH);
        }

        try {
            log.debug("왜 안돼~~~~~~~~~~~~~~~~~~~~~~~~~~");
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            SimulationMembersJsonDto dto = objectMapper.readValue(matchDetail.getBoxscore(), SimulationMembersJsonDto.class);
            log.debug("DTO Result: " + dto);
            return dto;
        } catch (IOException e) {
            throw new RuntimeException("Error parsing JSON", e);
        }
    }

    public SimulationResponseDto getFilteredMembers(SimulationMembersJsonDto dto) {
        Map<String, Player> awayPlayers = dto.getBoxscore().getTeams().getAway().getPlayers();
        Map<String, Player> homePlayers = dto.getBoxscore().getTeams().getHome().getPlayers();

        List<Player> filteredAwayBatters = dto.getBoxscore().getTeams().getAway().getBattingOrder().stream()
                .map(pid -> awayPlayers.get("ID" + pid))
                .collect(Collectors.toList());

        List<Player> filteredAwayPitchers = dto.getBoxscore().getTeams().getAway().getPitchers().stream()
                .map(pid -> awayPlayers.get("ID" + pid))
                .collect(Collectors.toList());

        List<Player> filteredHomeBatters = dto.getBoxscore().getTeams().getHome().getBattingOrder().stream()
                .map(pid -> homePlayers.get("ID" + pid))
                .collect(Collectors.toList());

        List<Player> filteredHomePitchers = dto.getBoxscore().getTeams().getHome().getPitchers().stream()
                .map(pid -> homePlayers.get("ID" + pid))
                .collect(Collectors.toList());

        return new SimulationResponseDto(filteredHomeBatters, filteredHomePitchers, filteredAwayBatters, filteredAwayPitchers);
    }
}
