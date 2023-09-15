package com.example.ssafy301.user.controller;

import com.example.ssafy301.playerLike.dto.PlayerLikeDto;
import com.example.ssafy301.teamLike.dto.TeamLikeDto;
import com.example.ssafy301.user.dto.UserDTO;
import com.example.ssafy301.user.dto.UserUpdateDTO;
import com.example.ssafy301.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<UserDTO> getUserByRefreshToken(@RequestHeader("Authorization") String refreshToken) {
        try {
            UserDTO userDTO = userService.getUserByRefreshToken(refreshToken);
            return ResponseEntity.status(HttpStatus.OK).body(userDTO);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/playerLike")
    public ResponseEntity<List<PlayerLikeDto>> getLikedPlayers(@RequestHeader("Authorization") String refreshToken) {
        try {
            List<PlayerLikeDto> likedPlayers = userService.getLikedPlayersByRefreshToken(refreshToken);
            return ResponseEntity.status(HttpStatus.OK).body(likedPlayers);
        } catch(RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/teamLike")
    public ResponseEntity<List<TeamLikeDto>> getLikedTeams(@RequestHeader("Authorization") String refreshToken) {
        List<TeamLikeDto> likedTeams = userService.getLikedTeamsByRefreshToken(refreshToken);
        return ResponseEntity.ok(likedTeams);
    }

    @PostMapping("/update")
    public ResponseEntity updateUser(@RequestBody UserUpdateDTO dto) {
        userService.updateUser(dto);
        return ResponseEntity.ok().build();
    }


}
