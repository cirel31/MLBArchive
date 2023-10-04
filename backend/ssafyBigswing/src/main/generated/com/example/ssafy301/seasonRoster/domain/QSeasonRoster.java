package com.example.ssafy301.seasonRoster.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QSeasonRoster is a Querydsl query type for SeasonRoster
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSeasonRoster extends EntityPathBase<SeasonRoster> {

    private static final long serialVersionUID = 1012916437L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QSeasonRoster seasonRoster = new QSeasonRoster("seasonRoster");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.example.ssafy301.player.domain.QPlayer player;

    public final NumberPath<Integer> season = createNumber("season", Integer.class);

    public final com.example.ssafy301.team.domain.QTeam team;

    public QSeasonRoster(String variable) {
        this(SeasonRoster.class, forVariable(variable), INITS);
    }

    public QSeasonRoster(Path<? extends SeasonRoster> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QSeasonRoster(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QSeasonRoster(PathMetadata metadata, PathInits inits) {
        this(SeasonRoster.class, metadata, inits);
    }

    public QSeasonRoster(Class<? extends SeasonRoster> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.player = inits.isInitialized("player") ? new com.example.ssafy301.player.domain.QPlayer(forProperty("player")) : null;
        this.team = inits.isInitialized("team") ? new com.example.ssafy301.team.domain.QTeam(forProperty("team")) : null;
    }

}

