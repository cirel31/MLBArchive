package com.example.ssafy301.player.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Player {

    @Id
    @Column(name = "player_id")
    private Long id;
    private String name;
    private String korName;
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
    private LocalDate debutDate;
    @Column(name = "retire_date")
    private LocalDate retireDate;
    private String hometown;
    private int backnumber;



}
