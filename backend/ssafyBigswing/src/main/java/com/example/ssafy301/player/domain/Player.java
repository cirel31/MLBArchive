package com.example.ssafy301.player.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Player {

    @Id
    @Column(name = "player_id")
    private Long id;
    private String name;
    private boolean isPlaying;
    private int height;
    private int weight;

    @Enumerated(EnumType.STRING)
    private Position mainPosition; // 주포지션

    @Enumerated(EnumType.STRING)
    @Column(name = "main_hand")
    private UseHand mainHand;

    private String image;

    @Column(name = "debut_date")
    private LocalDateTime debutDate;
    @Column(name = "retire_date")
    private LocalDateTime retireDate;
    private String hometown;



}
