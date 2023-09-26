package com.example.ssafy301.match.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class MatchDetailJsonDto {
    public static class Game {
        private int game_id;
        private BoxScore boxscore;

    }

    public static class BoxScore {
        private Teams teams;

    }

    public static class Teams {
        private TeamDetails away;
        private TeamDetails home;
        // getters, setters ...
    }

    public static class TeamDetails {
        private Team team;
        private Map<String, Player> players;
        private List<Integer> pitchers;
        private List<Integer> battingOrder;
        // getters, setters ...
    }

    public static class Team {
        // 팀 관련 정보 (현재 빈 객체로 표시됨)
        private Long id;
        private String name;

        // getters, setters ...
    }

    public static class Player {
        private Person person;
        private Stats stats;
        private Position postion;
        // getters, setters ...
    }

    public static class Person {
        private int id;
        private String fullName;
        // getters, setters ...
    }

    public static class Stats {
        private Batting batting;
        private Pitching pitching;
        private Fielding fielding;
        // getters, setters ...
    }

    public static class Position {
        private Long id;
        private String name;
        private String type;
    }

    public static class Batting {
        private Long hits; // 안타
        private Long runs; // 득점
        private Long rbi; // 타점
        private Long baseOnBalls;//볼넷
        private Long strikeOuts;//삼진
        private Long homeRuns;//홈런
        private Long atBats;//타수

    }
    public static class Pitching {
        private float inningsPitched;// 이닝
        private Long hits; // 피안타
        private Long runs; //실점
        private Long rbi; // 자책
        private Long baseOnBalls;//볼넷
        private Long strikeOuts;//삼진
        private Long homeRuns;//피홈런
        private Long battersFaced;//타자
        private Long atBats;//타수
        private Long pitchesThrown;//투구수

    }
    public class Fielding {

    }
}
