package com.example.ssafy301.teamLike.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.team.domain.Team;
import com.example.ssafy301.team.repository.TeamRepository;
import com.example.ssafy301.teamLike.domain.TeamLike;
import com.example.ssafy301.teamLike.dto.TeamLikeDto;
import com.example.ssafy301.teamLike.repository.TeamLikeRepository;
import com.example.ssafy301.user.domain.User;
import com.example.ssafy301.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TeamLikeService {
    private final TeamRepository teamRepository;
    private final TeamLikeRepository teamLikeRepository;
    private final UserRepository userRepository;

    // 해당 유저가 좋아하는 팀 목록 가져오기
    public List<TeamLikeDto> getLikeTeamList(Long userId) {
        List<TeamLike> teamLikes = teamLikeRepository.getTeamLikesByUserId(userId);

        // 좋아요 누른 팀이 없다면 예외 발생
        if(teamLikes == null || teamLikes.size() == 0) {
            throw new NotFoundException(FailCode.NO_TEAM_LIKE);
        }

        List<TeamLikeDto> likeTeams = teamLikes.stream().map((team) -> {
            return new TeamLikeDto(team);
        }).collect(Collectors.toList());

        return likeTeams;
    }

    // 시뮬레이션 추천을 위한 좋아하는 팀 반환 로직
    public List<TeamLikeDto> getLikeTeams(Long userId) {
        List<TeamLike> teamLikes = teamLikeRepository.getTeamLikesByUserId(userId);
        List<TeamLikeDto> result = new ArrayList<>();

        if(teamLikes != null && !teamLikes.isEmpty()) {
           result = teamLikes.stream().map((team) -> {
                return new TeamLikeDto(team);
            }).collect(Collectors.toList());
        }

        return result;
    }

    @Transactional
    public void saveTeamLike(String refreshToken, Long teamId) {
        // 토큰으로 유저를 조회합니다.
        User user = userRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new NotFoundException(FailCode.USER_NOT_FOUND));

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new NotFoundException(FailCode.NO_TEAM));

        // 해당 유저와 팀 조합으로 이미 좋아요를 눌렀는지 확인합니다.
        TeamLike existingLike = teamLikeRepository.findByUserAndTeam(user, team);
        if (existingLike != null) {
            teamLikeRepository.delete(existingLike);
        }else{
            TeamLike teamLike = new TeamLike();
            teamLike.setUser(user);
            teamLike.setTeam(team);
            teamLike.setLikedDate(LocalDate.now());
            teamLikeRepository.save(teamLike);
        }
    }

}
