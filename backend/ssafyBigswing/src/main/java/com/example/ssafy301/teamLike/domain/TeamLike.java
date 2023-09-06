package com.example.ssafy301.teamLike.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TeamLike {

    @Id
    @Column(name = "teamlike_id")
    private Long id;

    private Long userId;
    private Long teamId;

    // 좋아요 누른 시간
    private LocalDateTime likedDate;
}
