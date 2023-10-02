package com.example.ssafy301.hitting.repository;

import com.example.ssafy301.hitting.domain.Hitting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HittingRepository extends JpaRepository<Hitting, Long> {

    Hitting getHittingByPlayerIdAndSeason(Long playerId, int season);
    List<Hitting> getHittingsByPlayerIdAndSeason(Long playerId, int season);

    List<Hitting> getHittingsBySeason(int season);
}
