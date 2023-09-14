package com.example.ssafy301.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class UserController {
//    @GetMapping("/user")
//    public ResponseEntity<UserDTO> getUser(@RequestHeader("Authorization") String accessToken) {
//        //Long id = authService.extractID(accessToken);
//        //UserDTO findUser = userService.getUserById(id);
//        //return ResponseEntity.status(HttpStatus.OK).body(findUser);
//        log.debug("avs");
//    }

}
