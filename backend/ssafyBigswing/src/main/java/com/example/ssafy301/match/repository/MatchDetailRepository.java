package com.example.ssafy301.match.repository;

import com.example.ssafy301.match.domain.MatchDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MatchDetailRepository extends JpaRepository<MatchDetail, Long> {
    Optional<MatchDetail> findById(Long Id);
}
