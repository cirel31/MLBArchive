package com.example.ssafy301.fielding.repository;

import com.example.ssafy301.fielding.domain.Fielding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FieldingRepository extends JpaRepository<Fielding, Long> {

    Fielding getFieldingByPlayerIdAndSeason(Long playerId, int season);
}
