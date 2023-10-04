package com.example.ssafy301.player.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QPlayer is a Querydsl query type for Player
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPlayer extends EntityPathBase<Player> {

    private static final long serialVersionUID = 1837127099L;

    public static final QPlayer player = new QPlayer("player");

    public final NumberPath<Integer> backnumber = createNumber("backnumber", Integer.class);

    public final DatePath<java.time.LocalDate> debutDate = createDate("debutDate", java.time.LocalDate.class);

    public final NumberPath<Integer> height = createNumber("height", Integer.class);

    public final StringPath hometown = createString("hometown");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final BooleanPath isPlaying = createBoolean("isPlaying");

    public final StringPath korName = createString("korName");

    public final EnumPath<UseHand> mainHand = createEnum("mainHand", UseHand.class);

    public final EnumPath<Position> mainPosition = createEnum("mainPosition", Position.class);

    public final StringPath name = createString("name");

    public final DatePath<java.time.LocalDate> retireDate = createDate("retireDate", java.time.LocalDate.class);

    public final NumberPath<Integer> weight = createNumber("weight", Integer.class);

    public QPlayer(String variable) {
        super(Player.class, forVariable(variable));
    }

    public QPlayer(Path<? extends Player> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPlayer(PathMetadata metadata) {
        super(Player.class, metadata);
    }

}

