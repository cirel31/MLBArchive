package com.example.ssafy301.playerLike.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.player.domain.Player;
import com.example.ssafy301.player.repository.PlayerRepository;
import com.example.ssafy301.playerLike.domain.PlayerLike;
import com.example.ssafy301.playerLike.dto.PlayerLikeDto;
import com.example.ssafy301.playerLike.repository.PlayerLikeRepository;
import com.example.ssafy301.user.domain.User;
import com.example.ssafy301.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlayerLikeService {

    private final PlayerLikeRepository playerLikeRepository;
    private final UserRepository userRepository;
    private final PlayerRepository playerRepository;
    // 해당 유저가 좋아하는 선수 목록 가져오기
    public List<PlayerLikeDto> getLikePlayerList(Long userId) {
        List<PlayerLike> playerLikes = playerLikeRepository.getPlayerLikesByUserId(userId);

        // 좋아요 누른 선수가 없다면 예외 발생
        if(playerLikes == null || playerLikes.size() == 0) {
            throw new NotFoundException(FailCode.NO_PLAYER_LIKE);
        }

        List<PlayerLikeDto> likePlayers = playerLikes.stream().map((like) -> {
            return new PlayerLikeDto(like);
        }).collect(Collectors.toList());

        return likePlayers;
    }

    public PlayerLike savePlayerLike(String refreshToken, Long playerId) {
        User user = userRepository.findByRefreshToken(refreshToken).orElseThrow(() -> new NotFoundException(FailCode.USER_NOT_FOUND));
        Player player = playerRepository.findById(playerId).orElseThrow(() -> new NotFoundException(FailCode.NO_PLAYER));

        PlayerLike playerLike = new PlayerLike();
        playerLike.setUser(user);
        playerLike.setPlayer(player);
        playerLike.setLikedDate(LocalDate.now());

        return playerLikeRepository.save(playerLike);
    }


}
