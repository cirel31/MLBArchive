package com.example.ssafy301.match.repository;

import com.example.ssafy301.match.domain.MatchDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchDetailRepository extends JpaRepository<MatchDetail, Long> {
    MatchDetail findByMatchId(Long matchId);
}
