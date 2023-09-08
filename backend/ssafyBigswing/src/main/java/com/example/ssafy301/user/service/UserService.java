package com.example.ssafy301.user.service;
import com.example.ssafy301.user.dto.UserDTO;
import com.example.ssafy301.user.entity.User;
import com.example.ssafy301.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void saveOrUpdateUser(UserDTO userDto) {
        Optional<User> existingUser = userRepository.findByEmail(userDto.getEmail());

        if (existingUser.isPresent()) {
            // 이미 존재하는 유저 정보 업데이트
            User user = existingUser.get();

            userRepository.save(user);
        } else {
            // 새로운 유저 정보 저장
            User user = User.builder()
                    .email(userDto.getEmail())
                    .nickname(userDto.getNickname())
                    .profileImage(userDto.getProfileImage())
                    .socialType(userDto.getSocialType())
                    .build();
            userRepository.save(user);
        }
    }
}
