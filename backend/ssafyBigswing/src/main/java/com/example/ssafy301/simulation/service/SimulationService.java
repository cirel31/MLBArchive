package com.example.ssafy301.simulation.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.hitting.domain.Hitting;
import com.example.ssafy301.hitting.repository.HittingRepository;
import com.example.ssafy301.match.dto.MatchDetailDto;
import com.example.ssafy301.match.dto.MatchDto;
import com.example.ssafy301.match.dto.QMatchDto;
import com.example.ssafy301.match.service.MatchService;
import com.example.ssafy301.pitching.domain.Pitching;
import com.example.ssafy301.pitching.repository.PitchingRepository;
import com.example.ssafy301.player.domain.Player;
import com.example.ssafy301.player.domain.Position;
import com.example.ssafy301.player.repository.PlayerRepository;
import com.example.ssafy301.player.service.PlayerService;
import com.example.ssafy301.seasonRoster.domain.SeasonRoster;
import com.example.ssafy301.seasonRoster.dto.SeasonRosterDto;
import com.example.ssafy301.seasonRoster.dto.SeasonRosterReqDto;
import com.example.ssafy301.seasonRoster.repository.SeasonRosterRepository;
import com.example.ssafy301.seasonRoster.service.SeasonRosterService;
import com.example.ssafy301.simulation.dto.PlayerSearchRespDto;
import com.example.ssafy301.simulation.dto.SimulationMembersDto;
import com.example.ssafy301.simulation.dto.SimulationPlayerSearchDto;
import com.example.ssafy301.teamLike.dto.TeamLikeDto;
import com.example.ssafy301.user.service.UserService;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.ssafy301.match.domain.QMatch.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SimulationService {

    private final MatchService matchService;
    private final SeasonRosterService seasonRosterService;
    private final SeasonRosterRepository seasonRosterRepository;
    private final UserService userService;
    private final PlayerService playerService;
    private final PlayerRepository playerRepository;
    private final HittingRepository hittingRepository;
    private final PitchingRepository pitchingRepository;
    private final JPAQueryFactory queryFactory;

    // 시뮬레이션 추천
    // 내가 좋아하는 팀이 참여한 경기 중
    // 큰 점수 차로 진 경기를 보여주자
    public List<MatchDto> getRecommendedSimulations(String refreshToken) {

        TeamLikeDto likeTeam = userService.getLikedTeamsByRefreshToken(refreshToken).get(0);
        int currentYear = LocalDate.now().getYear();

        List<MatchDto> result;

        // 좋아하는 팀이 없다면
        // 작년부터 올해까지의 전체 경기 목록에서
        // 점수 차가 큰 Top5를 가져오자
        if(likeTeam == null) {
            // 우선 작년부터 올해까지의 경기 리스트를 모두 가져오자
            List<MatchDto> allMatches = queryFactory
                    .select(new QMatchDto(
                            match
                    ))
                    .from(match)
                    .where(
                            matchDateIn(currentYear - 1, currentYear))
                    .fetch();
            
            // 전체 경기 중에
            // 점수 차가 큰 Top5 경기를 가져옴
            Collections.sort(allMatches, new Comparator<MatchDto>() {
                @Override
                public int compare(MatchDto match1, MatchDto match2) {
                    // 홈팀과 어웨이팀의 점수차가 클수록 앞에 위치
                    int scoreDifference1 = Math.abs(match1.getHomeScore() - match1.getAwayScore());
                    int scoreDifference2 = Math.abs(match2.getHomeScore() - match2.getAwayScore());

                    return Integer.compare(scoreDifference2, scoreDifference1);
                }
            });

            result = allMatches.subList(0, Math.min(5, allMatches.size()));
        }
        // 좋아하는 팀이 있다면
        // 작년부터 올해까지의 경기 중
        // 내 팀이 참여한 경기만을 골라
        // 점수 차가 크게 진 Top5를 가져오자
        else {
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

            result = loseMatches.subList(0, Math.min(5, loseMatches.size()));
        }

        return result;
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

    public List<PlayerSearchRespDto> getReplacementList(SimulationPlayerSearchDto searchDto) {

        // 우선 검색어가 이름에 포함된 선수가 존재하는지 확인
        List<Player> players = playerService.searchSimulationPlayerByName(searchDto.getContent());

        // 팀id랑 season으로
        // seasonRoster 목록을 가져오자
        List<SeasonRoster> seasonRosters = seasonRosterRepository.getSeasonRostersByTeamIdAndSeason(searchDto.getTeamId(), searchDto.getSeason());
        // 입력된 시즌에 해당 팀의 SeasonRoster가 존재하지 않으면 예외 발생
        if(seasonRosters == null || seasonRosters.isEmpty()) {
            throw new NotFoundException(FailCode.NO_SEASONROSTER);
        }

        // 교체되려는 선수의 포지션을 알아오자
        Player currentPlayer = playerRepository.findById(searchDto.getPlayerId()).orElseThrow(() -> new NotFoundException(FailCode.NO_REPLACED_PLAYER));
        Position mainPosition = currentPlayer.getMainPosition();

        // seasonRoster의 id와 같고
        // mainPosition과 포지션이 같은 선수만 남겨주자
        List<Player> matchedPlayers = players.stream()
                .filter(player -> seasonRosters.stream()
                        .anyMatch(seasonRoster -> seasonRoster.getPlayer().getId() == player.getId()
                        && seasonRoster.getPlayer().getMainPosition() == mainPosition))
                .collect(Collectors.toList());

        // 이제 matchedPlayers에서
        // Hitting과 Pitching 스탯을 가져와서
        // Dto를 만들어주고 반환
        List<PlayerSearchRespDto> result = matchedPlayers.stream()
                .map(matchedPlayer -> {
                    Hitting hitting = hittingRepository.getHittingByPlayerIdAndSeason(matchedPlayer.getId(), searchDto.getSeason());
                    Pitching pitching = pitchingRepository.getPitchingByPlayerIdAndSeason(matchedPlayer.getId(), searchDto.getSeason());
                    return new PlayerSearchRespDto(matchedPlayer, hitting, pitching);
                })
                .collect(Collectors.toList());

        return result;
    }
}
