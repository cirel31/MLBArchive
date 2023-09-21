package com.example.ssafy301.common.api.status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum FailCode {

    GENERAL_ERROR(BAD_REQUEST, "데이터 처리 실패"),

    // 스탯 관련
    NO_FIELDING_STAT(NO_CONTENT, "관련된 수비 성적이 존재하지 않습니다"),
    NO_HITTING_STAT(NO_CONTENT, "관련된 타석 성적이 존재하지 않습니다"),
    NO_PITCHING_STAT(NO_CONTENT, "관련된 투구 성적이 존재하지 않습니다"),

    // 경기 관련
    NO_MATCHES(NO_CONTENT, "입력하신 내용의 경기가 존재하지 않습니다."),
    NO_MATCH(NO_CONTENT, "말씀하신 경기는 존재하지 않습니다."),
    NO_TODAY_MATCH(NO_CONTENT, "오늘은 경기가 없습니다."),

    // 좋아요 관련
    NO_PLAYER_LIKE(NO_CONTENT, "좋아하는 선수가 없습니다"),
    NO_TEAM_LIKE(NO_CONTENT, "좋아하는 팀이 없습니다"),

    // 팀 관련
    NO_SEASONROSTER(NO_CONTENT, "해당 팀 혹은 시즌의 선수가 존재하지 않습니다."),
    NO_TEAM(NO_CONTENT, "해당 팀은 존재하지 않습니다"),
    NO_TEAM_STAT(NO_CONTENT, "입력하신 팀과 관련된 스탯이 존재하지 않습니다."),

    // 선수 관련
    NO_PLAYERS(NO_CONTENT, "선수 목록이 존재하지 않습니다."),
    NO_PLAYER(NO_CONTENT, "해당 선수는 존재하지 않습니다."),

    // 유저 관련
    USER_NOT_FOUND(NOT_FOUND, "해당 refreshToken으로 사용자를 찾을 수 없습니다.");

    private final HttpStatus status;
    private final String message;
}
