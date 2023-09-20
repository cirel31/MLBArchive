package com.example.ssafy301.user.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.playerLike.dto.PlayerLikeDto;
import com.example.ssafy301.playerLike.service.PlayerLikeService;
import com.example.ssafy301.teamLike.dto.TeamLikeDto;
import com.example.ssafy301.teamLike.service.TeamLikeService;
import com.example.ssafy301.user.domain.User;
import com.example.ssafy301.user.dto.UserDTO;
import com.example.ssafy301.user.dto.UserUpdateDTO;
import com.example.ssafy301.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PlayerLikeService playerLikeService;

    @Autowired
    private TeamLikeService teamLikeService;

    public UserDTO getUserByRefreshToken(String refreshToken) {
        Optional<User> optionUser= userRepository.findByRefreshToken(refreshToken);
        User user = optionUser.orElse(null);
        log.debug("리프레시 : "+refreshToken);
        if (user == null) {
            throw new NotFoundException(FailCode.USER_NOT_FOUND);
        }
        // DTO 변환 로직 (이 부분은 User와 UserDTO의 구조에 따라 다를 수 있습니다)
        return convertUserToDTO(user);
    }

    private UserDTO convertUserToDTO(User user) {
        return new UserDTO(
                user.getEmail(),
                user.getNickname(),
                user.getProfileImage(),
                user.getSocialType(),
                user.getRefreshToken(),
                null  // AccessToken은 User 엔터티에 저장되지 않은 것 같으므로 null로 설정합니다. 필요하면 수정하세요.
        );
    }

    public User findByRefreshToken(String refreshToken) {
        return userRepository.findByRefreshToken(refreshToken)
                .orElse(null);
    }

    public List<PlayerLikeDto> getLikedPlayersByRefreshToken(String refreshToken) {
        User user = findByRefreshToken(refreshToken);
        return playerLikeService.getLikePlayerList(user.getId());
    }

    public List<TeamLikeDto> getLikedTeamsByRefreshToken(String refreshToken) {
        User user = findByRefreshToken(refreshToken);
        return teamLikeService.getLikeTeamList(user.getId());
    }

    @Transactional
    public void updateUser(UserUpdateDTO dto) {
        User user = userRepository.findByEmail(dto.getEmail()).get();
        user.update(dto.getNickname(), dto.getProfileImage());
    }

}