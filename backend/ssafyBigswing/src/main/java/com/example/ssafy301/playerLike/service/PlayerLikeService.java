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
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
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

    @Transactional
    public void savePlayerLike(String refreshToken, Long playerId) {
        User user = userRepository.findByRefreshToken(refreshToken).orElseThrow(() -> new NotFoundException(FailCode.USER_NOT_FOUND));
        Player player = playerRepository.findById(playerId).orElseThrow(() -> new NotFoundException(FailCode.NO_PLAYER));
        log.debug(user.getNickname());
        log.debug(player.getName());
        Optional<PlayerLike> check = playerLikeRepository.findByUserIdAndPlayerId(user.getId(), player.getId());
        //log.debug("체크: "+check.getPlayer().getId()+" "+check.getUser().getId());
        if(!check.isPresent()){
            log.debug("등록 성공!");
            PlayerLike playerLike = new PlayerLike();
            playerLike.setUser(user);
            playerLike.setPlayer(player);
            playerLike.setLikedDate(LocalDate.now());
            playerLikeRepository.save(playerLike);
        }else{
            log.debug("제거 성공");
            playerLikeRepository.delete(check.get());
        }

    }


}
