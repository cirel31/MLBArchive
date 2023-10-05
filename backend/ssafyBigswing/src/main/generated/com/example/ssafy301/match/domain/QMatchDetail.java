package com.example.ssafy301.match.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMatchDetail is a Querydsl query type for MatchDetail
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMatchDetail extends EntityPathBase<MatchDetail> {

    private static final long serialVersionUID = -202062062L;

    public static final QMatchDetail matchDetail = new QMatchDetail("matchDetail");

    public final StringPath boxscore = createString("boxscore");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath linescore = createString("linescore");

    public final NumberPath<Long> matchId = createNumber("matchId", Long.class);

    public QMatchDetail(String variable) {
        super(MatchDetail.class, forVariable(variable));
    }

    public QMatchDetail(Path<? extends MatchDetail> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMatchDetail(PathMetadata metadata) {
        super(MatchDetail.class, metadata);
    }

}

