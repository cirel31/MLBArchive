package com.example.ssafy301.fielding.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFielding is a Querydsl query type for Fielding
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFielding extends EntityPathBase<Fielding> {

    private static final long serialVersionUID = 536492425L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFielding fielding = new QFielding("fielding");

    public final NumberPath<Integer> assist = createNumber("assist", Integer.class);

    public final NumberPath<Integer> error = createNumber("error", Integer.class);

    public final NumberPath<Integer> gamesPlayed = createNumber("gamesPlayed", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.example.ssafy301.player.domain.QPlayer player;

    public final EnumPath<com.example.ssafy301.player.domain.Position> position = createEnum("position", com.example.ssafy301.player.domain.Position.class);

    public final NumberPath<Integer> putout = createNumber("putout", Integer.class);

    public final NumberPath<Integer> season = createNumber("season", Integer.class);

    public QFielding(String variable) {
        this(Fielding.class, forVariable(variable), INITS);
    }

    public QFielding(Path<? extends Fielding> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFielding(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFielding(PathMetadata metadata, PathInits inits) {
        this(Fielding.class, metadata, inits);
    }

    public QFielding(Class<? extends Fielding> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.player = inits.isInitialized("player") ? new com.example.ssafy301.player.domain.QPlayer(forProperty("player")) : null;
    }

}

