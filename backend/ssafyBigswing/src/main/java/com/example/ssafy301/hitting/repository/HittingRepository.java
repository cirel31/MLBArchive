package com.example.ssafy301.hitting.repository;

import com.example.ssafy301.hitting.domain.Hitting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HittingRepository extends JpaRepository<Hitting, Long> {

    Hitting getHittingByPlayerIdAndSeason(Long playerId, int season);
}
