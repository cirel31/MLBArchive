package com.example.ssafy301.match.repository;

import com.example.ssafy301.match.domain.Match;
import com.example.ssafy301.match.domain.MatchDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    MatchDetail findByMatchId(Long matchId);

}
