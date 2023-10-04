package com.example.ssafy301.player.dto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.example.ssafy301.player.dto.QPlayerDto is a Querydsl Projection type for PlayerDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QPlayerDto extends ConstructorExpression<PlayerDto> {

    private static final long serialVersionUID = -1742205921L;

    public QPlayerDto(com.querydsl.core.types.Expression<? extends com.example.ssafy301.player.domain.Player> player) {
        super(PlayerDto.class, new Class<?>[]{com.example.ssafy301.player.domain.Player.class}, player);
    }

}

