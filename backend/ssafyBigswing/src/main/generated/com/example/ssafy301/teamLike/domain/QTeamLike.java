package com.example.ssafy301.teamLike.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamLike is a Querydsl query type for TeamLike
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTeamLike extends EntityPathBase<TeamLike> {

    private static final long serialVersionUID = -545421471L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTeamLike teamLike = new QTeamLike("teamLike");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DatePath<java.time.LocalDate> likedDate = createDate("likedDate", java.time.LocalDate.class);

    public final com.example.ssafy301.team.domain.QTeam team;

    public final com.example.ssafy301.user.domain.QUser user;

    public QTeamLike(String variable) {
        this(TeamLike.class, forVariable(variable), INITS);
    }

    public QTeamLike(Path<? extends TeamLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTeamLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTeamLike(PathMetadata metadata, PathInits inits) {
        this(TeamLike.class, metadata, inits);
    }

    public QTeamLike(Class<? extends TeamLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.team = inits.isInitialized("team") ? new com.example.ssafy301.team.domain.QTeam(forProperty("team")) : null;
        this.user = inits.isInitialized("user") ? new com.example.ssafy301.user.domain.QUser(forProperty("user")) : null;
    }

}

