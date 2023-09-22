package com.example.ssafy301.simulation.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.match.dto.MatchDetailDto;
import com.example.ssafy301.match.dto.MatchDto;
import com.example.ssafy301.match.dto.QMatchDto;
import com.example.ssafy301.match.service.MatchService;
import com.example.ssafy301.seasonRoster.dto.SeasonRosterDto;
import com.example.ssafy301.seasonRoster.dto.SeasonRosterReqDto;
import com.example.ssafy301.seasonRoster.service.SeasonRosterService;
import com.example.ssafy301.simulation.dto.SimulationMembersDto;
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

import static com.example.ssafy301.match.domain.QMatch.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SimulationService {

    private final MatchService matchService;
    private final SeasonRosterService seasonRosterService;
    private final UserService userService;
    private final JPAQueryFactory queryFactory;

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
                        matchTeam(likeTeam.getTeamName()),
                        matchDateIn(currentYear - 1, currentYear))
                .fetch();

        // 경기가 없다면 예외 발생
        if(myTeamMatches == null || myTeamMatches.size() == 0) {
            throw new NotFoundException(FailCode.NO_MATCH);
        }

        // 그리고 내가 응원하는 팀이 진 경기를 가져오자
        List<MatchDto> loseMatches = new ArrayList<>();
        String myTeamName = likeTeam.getTeamName();
        for (MatchDto myTeamMatch : myTeamMatches) {
            // 경기에서 내가 좋아하는 팀이 홈팀인 경우, 홈팀의 점수가 더 낮을 때 loseMatches에 넣어줌
            if(myTeamMatch.getHomeName().equals(myTeamName) && (myTeamMatch.getHomeScore() < myTeamMatch.getAwayScore())) {
                loseMatches.add(myTeamMatch);
            }
            // 경기에서 내가 좋아하는 팀이 어웨이팀인 경우, 어웨이팀의 점수가 더 낮을 때 loseMatches에 넣어줌
            else if (myTeamMatch.getAwayName().equals(myTeamName) && (myTeamMatch.getAwayScore() < myTeamMatch.getHomeScore())) {
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

    private BooleanExpression matchTeam(String teamName) {
        return match.homeName.eq(teamName).or(match.awayName.eq(teamName));
    }


    // 시뮬레이션 하고 싶은 경기를 선택하면
    // 해당 경기에 참여한 두 팀의 선수 목록을 보내줌
    public SimulationMembersDto getSimulationTeams(Long matchId) {
        MatchDetailDto match = matchService.getMatchById(matchId);
        List<SeasonRosterDto> homeMembers = seasonRosterService.getSeasonRosterList(new SeasonRosterReqDto(match.getHomeId(), match.getMatchDate().getYear()));
        List<SeasonRosterDto> awayMembers = seasonRosterService.getSeasonRosterList(new SeasonRosterReqDto(match.getAwayId(), match.getMatchDate().getYear()));
        return new SimulationMembersDto(homeMembers, awayMembers);
    }
}
