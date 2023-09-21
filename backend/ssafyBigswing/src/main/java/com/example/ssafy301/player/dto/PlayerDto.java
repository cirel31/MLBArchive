package com.example.ssafy301.player.dto;

import com.example.ssafy301.player.domain.Player;
import com.example.ssafy301.player.domain.Position;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class PlayerDto {

    private Long id;
    private String name;
    private String korName;
    private int height;
    private int weight;
    private Position mainPosition;
    private String image;
    private int backnumber;


    @QueryProjection
    public PlayerDto(Player player) {
        this.id = player.getId();
        this.name = player.getName();
        this.korName = player.getKorName();
        this.height = player.getHeight();
        this.weight = player.getWeight();
        this.mainPosition = player.getMainPosition();
        this.image = player.getImage();
        this.backnumber = player.getBacknumber();
    }
}
