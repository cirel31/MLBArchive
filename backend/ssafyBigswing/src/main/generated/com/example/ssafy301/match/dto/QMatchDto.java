package com.example.ssafy301.match.dto;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.ConstructorExpression;
import javax.annotation.processing.Generated;

/**
 * com.example.ssafy301.match.dto.QMatchDto is a Querydsl Projection type for MatchDto
 */
@Generated("com.querydsl.codegen.DefaultProjectionSerializer")
public class QMatchDto extends ConstructorExpression<MatchDto> {

    private static final long serialVersionUID = -1550670705L;

    public QMatchDto(com.querydsl.core.types.Expression<? extends com.example.ssafy301.match.domain.Match> match) {
        super(MatchDto.class, new Class<?>[]{com.example.ssafy301.match.domain.Match.class}, match);
    }

}

