package com.example.ssafy301.user.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.playerLike.dto.PlayerLikeDto;
import com.example.ssafy301.teamLike.dto.TeamLikeDto;
import com.example.ssafy301.user.dto.UserDTO;
import com.example.ssafy301.user.dto.UserUpdateDTO;
import com.example.ssafy301.user.service.S3UploaderService;
import com.example.ssafy301.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

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
    public ResponseEntity updateUser(@RequestPart("user") UserUpdateDTO dto,
                                     @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            String url = s3Uploader.upload(file, "static");
            dto.setProfileImage(url);  // 이미지 URL을 DTO에 설정
        }

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
