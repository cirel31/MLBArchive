package com.example.ssafy301.simulation.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;


@AllArgsConstructor
@Data
@NoArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class SimulationMembersJsonDto {
    private int game_id;
    private BoxScore boxscore;
    @Data
    public static class BoxScore {
        private Teams teams;

    }
    @Data
    public static class Teams {
        private TeamDetails away;
        private TeamDetails home;

    }
    @Data
    public static class TeamDetails {
        private Team team;
        private Map<String, Players> players;
        private List<Integer> pitchers;
        private List<Integer> battingOrder;
        // getters, setters ...
    }
    @Data
    public static class Team {
        // 팀 관련 정보 (현재 빈 객체로 표시됨)
        private Long id;
        private String name;

        // getters, setters ...
    }
    @Data
    public static class Players {
        private Person person;
        private SeasonStats seasonStats;
        private Position position;
        // getters, setters ...
    }
    @Data
    public static class Person {
        private int id;
        private String fullName;
    }
    @Data
    public static class SeasonStats {
        private Batting batting;
        private Pitching pitching;
    }
    @Data
    public static class Position {
        private Long code;
        private String name;
        private String type;
    }
    @Data
    public static class Batting {
//        private Long hits; // 안타
//        private Long runs; // 득점
//        private Long rbi; // 타점
//        private Long baseOnBalls;//볼넷
//        private Long strikeOuts;//삼진
//        private Long homeRuns;//홈런
//        private Long atBats;//타수
        private String avg;
        private String ops;

    }
    @Data
    public static class Pitching {
//        private float inningsPitched;// 이닝
//        private Long hits; // 피안타
//        private Long runs; //실점
//        private Long rbi; // 자책
//        private Long baseOnBalls;//볼넷
//        private Long strikeOuts;//삼진
//        private Long homeRuns;//피홈런
//        private Long battersFaced;//타자
//        private Long atBats;//타수
//        private Long pitchesThrown;//투구수
        private String era;
        private String whip;
    }
}
