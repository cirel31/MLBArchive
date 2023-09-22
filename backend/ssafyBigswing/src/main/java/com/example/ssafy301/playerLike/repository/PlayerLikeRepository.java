package com.example.ssafy301.playerLike.repository;

import com.example.ssafy301.playerLike.domain.PlayerLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlayerLikeRepository extends JpaRepository<PlayerLike, Long> {
    List<PlayerLike> getPlayerLikesByUserId(Long userId);
    Optional<PlayerLike> findByUserIdAndPlayerId(Long userId, Long PlayerId);
}
