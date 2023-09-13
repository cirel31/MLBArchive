package com.example.ssafy301.player.dto;

import com.example.ssafy301.player.domain.Player;
import com.example.ssafy301.player.domain.Position;
import com.example.ssafy301.player.domain.UseHand;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PlayerDto {

    private Long id;
    private String name;
    private boolean isPlaying;
    private int height;
    private int weight;
    private Position mainPosition;
    private UseHand mainHand;
    private String image;
    private LocalDateTime debutDate;
    private LocalDateTime retireDate;
    private String hometown;

    public PlayerDto(Player player) {
        this.id = player.getId();
        this.name = player.getName();
        this.isPlaying = player.isPlaying();
        this.height = player.getHeight();
        this.weight = player.getWeight();
        this.mainPosition = player.getMainPosition();
        this.mainHand = player.getMainHand();
        this.image = player.getImage();
        this.debutDate = player.getDebutDate();
        this.retireDate = player.getRetireDate();
        this.hometown = player.getHometown();
    }
}
