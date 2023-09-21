package com.example.ssafy301.teamLike.repository;

import com.example.ssafy301.team.domain.Team;
import com.example.ssafy301.teamLike.domain.TeamLike;
import com.example.ssafy301.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamLikeRepository extends JpaRepository<TeamLike, Long> {
    List<TeamLike> getTeamLikesByUserId(Long userId);
    TeamLike findByUserAndTeam(User user, Team team);

}
