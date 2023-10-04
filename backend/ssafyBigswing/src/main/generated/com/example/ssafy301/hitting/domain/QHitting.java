package com.example.ssafy301.hitting.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QHitting is a Querydsl query type for Hitting
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QHitting extends EntityPathBase<Hitting> {

    private static final long serialVersionUID = -255720031L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QHitting hitting = new QHitting("hitting");

    public final NumberPath<Integer> atBats = createNumber("atBats", Integer.class);

    public final NumberPath<Float> battingAvg = createNumber("battingAvg", Float.class);

    public final NumberPath<Integer> gamesPlayed = createNumber("gamesPlayed", Integer.class);

    public final NumberPath<Integer> hits = createNumber("hits", Integer.class);

    public final NumberPath<Integer> homerun = createNumber("homerun", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Float> OBP = createNumber("OBP", Float.class);

    public final NumberPath<Float> ops = createNumber("ops", Float.class);

    public final com.example.ssafy301.player.domain.QPlayer player;

    public final NumberPath<Integer> RBI = createNumber("RBI", Integer.class);

    public final NumberPath<Integer> runs = createNumber("runs", Integer.class);

    public final NumberPath<Integer> season = createNumber("season", Integer.class);

    public final NumberPath<Float> sluggingAvg = createNumber("sluggingAvg", Float.class);

    public final NumberPath<Integer> stolenbases = createNumber("stolenbases", Integer.class);

    public final NumberPath<Float> war = createNumber("war", Float.class);

    public final NumberPath<Float> wrc = createNumber("wrc", Float.class);

    public QHitting(String variable) {
        this(Hitting.class, forVariable(variable), INITS);
    }

    public QHitting(Path<? extends Hitting> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QHitting(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QHitting(PathMetadata metadata, PathInits inits) {
        this(Hitting.class, metadata, inits);
    }

    public QHitting(Class<? extends Hitting> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.player = inits.isInitialized("player") ? new com.example.ssafy301.player.domain.QPlayer(forProperty("player")) : null;
    }

}

