package com.example.ssafy301.match.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMatch is a Querydsl query type for Match
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMatch extends EntityPathBase<Match> {

    private static final long serialVersionUID = -271544479L;

    public static final QMatch match = new QMatch("match");

    public final NumberPath<Long> awayId = createNumber("awayId", Long.class);

    public final StringPath awayName = createString("awayName");

    public final StringPath awayPitcher = createString("awayPitcher");

    public final NumberPath<Integer> awayScore = createNumber("awayScore", Integer.class);

    public final NumberPath<Integer> currentInning = createNumber("currentInning", Integer.class);

    public final NumberPath<Long> homeId = createNumber("homeId", Long.class);

    public final StringPath homeName = createString("homeName");

    public final StringPath homePitcher = createString("homePitcher");

    public final NumberPath<Integer> homeScore = createNumber("homeScore", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DateTimePath<java.time.LocalDateTime> matchDate = createDateTime("matchDate", java.time.LocalDateTime.class);

    public final StringPath status = createString("status");

    public QMatch(String variable) {
        super(Match.class, forVariable(variable));
    }

    public QMatch(Path<? extends Match> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMatch(PathMetadata metadata) {
        super(Match.class, metadata);
    }

}

