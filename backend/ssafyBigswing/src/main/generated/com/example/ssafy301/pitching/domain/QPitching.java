package com.example.ssafy301.pitching.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPitching is a Querydsl query type for Pitching
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPitching extends EntityPathBase<Pitching> {

    private static final long serialVersionUID = 787342717L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPitching pitching = new QPitching("pitching");

    public final NumberPath<Integer> blownsave = createNumber("blownsave", Integer.class);

    public final NumberPath<Float> era = createNumber("era", Float.class);

    public final NumberPath<Integer> gamesPlayed = createNumber("gamesPlayed", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Float> inningsPlayed = createNumber("inningsPlayed", Float.class);

    public final NumberPath<Float> kbb = createNumber("kbb", Float.class);

    public final NumberPath<Integer> lose = createNumber("lose", Integer.class);

    public final com.example.ssafy301.player.domain.QPlayer player;

    public final NumberPath<Integer> save = createNumber("save", Integer.class);

    public final NumberPath<Integer> season = createNumber("season", Integer.class);

    public final NumberPath<Float> whip = createNumber("whip", Float.class);

    public final NumberPath<Integer> win = createNumber("win", Integer.class);

    public QPitching(String variable) {
        this(Pitching.class, forVariable(variable), INITS);
    }

    public QPitching(Path<? extends Pitching> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPitching(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPitching(PathMetadata metadata, PathInits inits) {
        this(Pitching.class, metadata, inits);
    }

    public QPitching(Class<? extends Pitching> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.player = inits.isInitialized("player") ? new com.example.ssafy301.player.domain.QPlayer(forProperty("player")) : null;
    }

}

