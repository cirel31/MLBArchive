package com.example.ssafy301.team.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTeam is a Querydsl query type for Team
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTeam extends EntityPathBase<Team> {

    private static final long serialVersionUID = 1563757683L;

    public static final QTeam team = new QTeam("team");

    public final StringPath createdYear = createString("createdYear");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath korName = createString("korName");

    public final StringPath teamLocation = createString("teamLocation");

    public final StringPath teamLogo = createString("teamLogo");

    public final StringPath teamName = createString("teamName");

    public final ListPath<com.example.ssafy301.teamStat.domain.TeamStat, com.example.ssafy301.teamStat.domain.QTeamStat> teamStats = this.<com.example.ssafy301.teamStat.domain.TeamStat, com.example.ssafy301.teamStat.domain.QTeamStat>createList("teamStats", com.example.ssafy301.teamStat.domain.TeamStat.class, com.example.ssafy301.teamStat.domain.QTeamStat.class, PathInits.DIRECT2);

    public QTeam(String variable) {
        super(Team.class, forVariable(variable));
    }

    public QTeam(Path<? extends Team> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTeam(PathMetadata metadata) {
        super(Team.class, metadata);
    }

}

