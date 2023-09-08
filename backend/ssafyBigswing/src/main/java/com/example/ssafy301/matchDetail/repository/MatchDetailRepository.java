package com.example.ssafy301.matchDetail.repository;

import com.example.ssafy301.matchDetail.domain.MatchDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatchDetailRepository extends JpaRepository<MatchDetail, Long> {
}
