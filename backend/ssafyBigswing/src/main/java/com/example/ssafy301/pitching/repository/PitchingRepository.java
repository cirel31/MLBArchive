package com.example.ssafy301.pitching.repository;

import com.example.ssafy301.pitching.domain.Pitching;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PitchingRepository extends JpaRepository<Pitching, Long> {
    Pitching getPitchingByPlayerIdAndSeason(Long playerId, int season);

    List<Pitching> getPitchingsBySeason(int season);
}
