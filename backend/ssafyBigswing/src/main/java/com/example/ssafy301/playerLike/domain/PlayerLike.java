package com.example.ssafy301.playerLike.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlayerLike {

    @Id @GeneratedValue
    @Column(name = "playerlike_id")
    private Long id;

    private Long userId;
    private Long playerId;
    private LocalDateTime likedDate;
}
