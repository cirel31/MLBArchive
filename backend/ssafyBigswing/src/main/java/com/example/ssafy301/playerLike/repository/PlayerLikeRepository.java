package com.example.ssafy301.playerLike.repository;

import com.example.ssafy301.playerLike.domain.PlayerLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerLikeRepository extends JpaRepository<PlayerLike, Long> {
    List<PlayerLike> getPlayerLikesByUserId(Long userId);
}
