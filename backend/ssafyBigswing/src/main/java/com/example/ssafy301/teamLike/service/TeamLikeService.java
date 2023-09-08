package com.example.ssafy301.teamLike.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.teamLike.domain.TeamLike;
import com.example.ssafy301.teamLike.dto.TeamLikeDto;
import com.example.ssafy301.teamLike.repository.TeamLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TeamLikeService {

    private final TeamLikeRepository teamLikeRepository;

    // 해당 유저가 좋아하는 선수 목록 가져오기
    public List<TeamLikeDto> getLikeTeamList(Long userId) {
        List<TeamLike> teamLikes = teamLikeRepository.getTeamLikesByUserId(userId);

        // 좋아요 누른 선수가 없다면 예외 발생
        if(teamLikes == null || teamLikes.size() == 0) {
            throw new NotFoundException(FailCode.NO_TEAM_LIKE);
        }

        List<TeamLikeDto> likeTeams = teamLikes.stream().map((team) -> {
            return new TeamLikeDto(team);
        }).collect(Collectors.toList());

        return likeTeams;
    }
}
