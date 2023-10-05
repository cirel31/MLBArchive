package com.example.ssafy301.teamStat.repository;

import com.example.ssafy301.teamStat.domain.TeamStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamStatRepository extends JpaRepository<TeamStat, Long> {
    TeamStat getTeamStatByTeamIdAndSeason(Long teamId, int season);
}
