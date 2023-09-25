package com.example.ssafy301.match.dto;

import lombok.Data;
import java.util.List;

@Data
public class LineScoreDto {
    private int game_id;
    private String game_date;
    private CurrentScore currentScore;
    private TeamScore teams;
    private Defense defense;
    private Offense offense;
    private int balls;
    private int strikes;
    private int outs;

    @Data
    public static class CurrentScore {
        private int currentInning;
        private String currentInningOrdinal;
        private String inningState;
        private String inningHalf;
        private boolean isTopInning;
        private int scheduledInnings;
        private List<Inning> innings;
    }

    @Data
    public static class Inning {
        private int num;
        private String ordinalNum;
        private Score home;
        private Score away;
    }

    @Data
    public static class Score {
        private int runs;
        private int hits;
        private int errors;
        private int leftOnBase;
    }

    @Data
    public static class TeamScore {
        private Score home;
        private Score away;
    }

    @Data
    public static class Defense {
        private Player pitcher;
        private Player catcher;
        private Player first;
        private Player second;
        private Player third;
        private Player shortstop;
        private Player left;
        private Player center;
        private Player right;
        private Player batter;
        private Player onDeck;
        private Player inHole;
        private int battingOrder;
        private Team team;
    }

    @Data
    public static class Offense {
        private Player batter;
        private Player onDeck;
        private Player inHole;
        private Player pitcher;
        private int battingOrder;
        private Team team;
    }

    @Data
    public static class Player {
        private int id;
        private String fullName;
        private String link;
    }

    @Data
    public static class Team {
        private int id;
        private String name;
        private String link;
    }
}
