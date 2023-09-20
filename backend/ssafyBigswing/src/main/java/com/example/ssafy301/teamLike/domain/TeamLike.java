package com.example.ssafy301.teamLike.domain;

import com.example.ssafy301.team.domain.Team;
import com.example.ssafy301.user.domain.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeamLike {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teamlike_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    // 좋아요 누른 시간
    private LocalDate likedDate;
}
