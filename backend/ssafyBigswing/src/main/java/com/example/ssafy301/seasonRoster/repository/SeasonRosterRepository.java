package com.example.ssafy301.seasonRoster.repository;

import com.example.ssafy301.seasonRoster.domain.SeasonRoster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeasonRosterRepository extends JpaRepository<SeasonRoster, Long> {
    List<SeasonRoster> getSeasonRostersByTeamIdAndSeason(Long teamId, int season);

    List<SeasonRoster> getSeasonRostersBySeason(int season);
}
