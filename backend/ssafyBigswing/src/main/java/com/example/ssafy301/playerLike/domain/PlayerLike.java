package com.example.ssafy301.playerLike.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PlayerLike {

    @Id
    @Column(name = "playerlike_id")
    private Long id;

    private Long userId;
    private Long playerId;
    private LocalDateTime likedDate;
}
