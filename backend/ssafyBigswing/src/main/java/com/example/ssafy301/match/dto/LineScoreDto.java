package com.example.ssafy301.match.dto;

import lombok.Data;

import java.util.List;

@Data
public class LineScoreDto {

    private Long game_id;
    private String game_date;
    private InningScore linescore;

    @Data
    public static class InningScore {
        private Integer currentInning;
        private String currentInningOrdinal;
        private String inningState;
        private String inningHalf;
        private Boolean isTopInning;
        private Integer scheduledInnings;
        private List<InningDetail> innings;
        private TeamScore teams;
        private PlayerDefense defense;
        private PlayerOffense offense;
        private Integer balls;
        private Integer strikes;
        private Integer outs;
    }

    @Data
    public static class InningDetail {
        private Integer num;
        private String ordinalNum;
        private ScoreDetail home;
        private ScoreDetail away;
    }

    @Data
    public static class ScoreDetail {
        private Integer runs;
        private Integer hits;
        private Integer errors;
        private Integer leftOnBase;
    }

    @Data
    public static class TeamScore {
        private ScoreDetail home;
        private ScoreDetail away;
    }

    @Data
    public static class PlayerDefense {
        private PlayerDetail pitcher;
        private PlayerDetail catcher;
        private PlayerDetail first;
        private PlayerDetail second;
        private PlayerDetail third;
        private PlayerDetail shortstop;
        private PlayerDetail left;
        private PlayerDetail center;
        private PlayerDetail right;
        private PlayerDetail batter;
        private PlayerDetail onDeck;
        private PlayerDetail inHole;
        private Integer battingOrder;
        private TeamDetail team;
    }

    @Data
    public static class PlayerOffense {
        private PlayerDetail batter;
        private PlayerDetail onDeck;
        private PlayerDetail inHole;
        private PlayerDetail pitcher;
        private Integer battingOrder;
        private TeamDetail team;
    }

    @Data
    public static class PlayerDetail {
        private Long id;
        private String fullName;
        private String link;
    }

    @Data
    public static class TeamDetail {
        private Long id;
        private String name;
        private String link;
    }
}
