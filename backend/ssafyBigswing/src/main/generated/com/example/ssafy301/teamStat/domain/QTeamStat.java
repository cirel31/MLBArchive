package com.example.ssafy301.teamStat.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeamStat is a Querydsl query type for TeamStat
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTeamStat extends EntityPathBase<TeamStat> {

    private static final long serialVersionUID = 394336987L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTeamStat teamStat = new QTeamStat("teamStat");

    public final NumberPath<Float> battingAvg = createNumber("battingAvg", Float.class);

    public final NumberPath<Integer> divisionRank = createNumber("divisionRank", Integer.class);

    public final NumberPath<Integer> draw = createNumber("draw", Integer.class);

    public final NumberPath<Float> eraAvg = createNumber("eraAvg", Float.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> leagueRank = createNumber("leagueRank", Integer.class);

    public final NumberPath<Integer> lose = createNumber("lose", Integer.class);

    public final NumberPath<Integer> season = createNumber("season", Integer.class);

    public final com.example.ssafy301.team.domain.QTeam team;

    public final NumberPath<Integer> win = createNumber("win", Integer.class);

    public final NumberPath<Float> winPercentage = createNumber("winPercentage", Float.class);

    public QTeamStat(String variable) {
        this(TeamStat.class, forVariable(variable), INITS);
    }

    public QTeamStat(Path<? extends TeamStat> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTeamStat(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTeamStat(PathMetadata metadata, PathInits inits) {
        this(TeamStat.class, metadata, inits);
    }

    public QTeamStat(Class<? extends TeamStat> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.team = inits.isInitialized("team") ? new com.example.ssafy301.team.domain.QTeam(forProperty("team")) : null;
    }

}

