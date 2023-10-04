package com.example.ssafy301.user.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.playerLike.dto.PlayerLikeDto;
import com.example.ssafy301.teamLike.dto.TeamLikeDto;
import com.example.ssafy301.user.domain.User;
import com.example.ssafy301.user.dto.UserDTO;
import com.example.ssafy301.user.dto.UserUpdateDTO;
import com.example.ssafy301.user.repository.UserRepository;
import com.example.ssafy301.user.service.S3UploaderService;
import com.example.ssafy301.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private final S3UploaderService s3Uploader;

    @Autowired
    private UserRepository userRepository;
    @GetMapping("/user")
    public ResponseEntity<UserDTO> getUserByRefreshToken(@RequestHeader("refreshToken") String refreshToken) {
        UserDTO userDTO = userService.getUserByRefreshToken(refreshToken);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, userDTO);
    }

    @GetMapping("/playerlike")
    public ResponseEntity<List<PlayerLikeDto>> getLikedPlayers(@RequestHeader("refreshToken") String refreshToken) {
        List<PlayerLikeDto> result = userService.getLikedPlayersByRefreshToken(refreshToken);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);

    }

    @GetMapping("/teamlike")
    public ResponseEntity<List<TeamLikeDto>> getLikedTeams(@RequestHeader("refreshToken") String refreshToken) {
        List<TeamLikeDto> result = userService.getLikedTeamsByRefreshToken(refreshToken);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }

    @PostMapping("/update")
    public ResponseEntity updateUser(@RequestHeader("refreshToken") String refreshToken,
                                     @RequestPart("nickName") String nickName,
                                     @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {
        Optional<User> userOptional = userRepository.findByRefreshToken(refreshToken);
        User user = userOptional.orElse(null);
        UserUpdateDTO dto = new UserUpdateDTO(user.getEmail(),user.getNickname(),user.getProfileImage());
        dto.setNickname(nickName);
        log.debug("파일: "+file);
        if (file != null && !file.isEmpty()) {
            log.debug("asdasdadadsad");
            String url = s3Uploader.upload(file, "static");
            log.debug("url표시"+" "+url);
            dto.setProfileImage(url);  // 이미지 URL을 DTO에 설정
        }
        log.debug(dto.getEmail() +" "+ dto.getNickname()+" "+dto.getProfileImage());
        userService.updateUser(dto);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS);
    }

//    @PostMapping("/upload")
//    @ResponseBody
//    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) throws IOException {
//        System.out.println(file);
//        String url = s3Uploader.upload(file, "static");
//
//        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, s3Uploader.upload(file, "static"));
//    }

}
