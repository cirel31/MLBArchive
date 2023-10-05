package com.example.ssafy301.playerLike.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPlayerLike is a Querydsl query type for PlayerLike
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPlayerLike extends EntityPathBase<PlayerLike> {

    private static final long serialVersionUID = -1294739223L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPlayerLike playerLike = new QPlayerLike("playerLike");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DatePath<java.time.LocalDate> likedDate = createDate("likedDate", java.time.LocalDate.class);

    public final com.example.ssafy301.player.domain.QPlayer player;

    public final com.example.ssafy301.user.domain.QUser user;

    public QPlayerLike(String variable) {
        this(PlayerLike.class, forVariable(variable), INITS);
    }

    public QPlayerLike(Path<? extends PlayerLike> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPlayerLike(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPlayerLike(PathMetadata metadata, PathInits inits) {
        this(PlayerLike.class, metadata, inits);
    }

    public QPlayerLike(Class<? extends PlayerLike> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.player = inits.isInitialized("player") ? new com.example.ssafy301.player.domain.QPlayer(forProperty("player")) : null;
        this.user = inits.isInitialized("user") ? new com.example.ssafy301.user.domain.QUser(forProperty("user")) : null;
    }

}

