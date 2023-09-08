package com.example.ssafy301.teamLike.domain;

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
@NoArgsConstructor
@AllArgsConstructor
public class TeamLike {

    @Id @GeneratedValue
    @Column(name = "teamlike_id")
    private Long id;

    private Long userId;
    private Long teamId;

    // 좋아요 누른 시간
    private LocalDateTime likedDate;
}
