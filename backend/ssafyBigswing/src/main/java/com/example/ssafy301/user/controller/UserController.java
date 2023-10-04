package com.example.ssafy301.user.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.playerLike.dto.PlayerLikeDto;
import com.example.ssafy301.teamLike.dto.TeamLikeDto;
import com.example.ssafy301.user.dto.UserDTO;
import com.example.ssafy301.user.dto.UserUpdateDTO;
import com.example.ssafy301.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

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
    public ResponseEntity updateUser(@RequestBody UserUpdateDTO dto) {
        userService.updateUser(dto);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS);
    }


}
