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
    NO_FIELDING_STAT(NOT_FOUND, "관련된 수비 성적이 존재하지 않습니다"),
    NO_HITTING_STAT(NOT_FOUND, "관련된 타석 성적이 존재하지 않습니다"),
    NO_PITCHING_STAT(NOT_FOUND, "관련된 투구 성적이 존재하지 않습니다"),

    // 경기 관련
    NO_MATCH(NOT_FOUND, "말씀하신 경기는 존재하지 않습니다."),

    // 좋아요 관련
    NO_PLAYER_LIKE(NOT_FOUND, "좋아하는 선수가 없습니다"),
    NO_TEAM_LIKE(NOT_FOUND, "좋아하는 팀이 없습니다"),
    
    // 선수 관련
    NO_PLAYER(BAD_REQUEST, "해당 선수는 존재하지 않습니다.");

    private final HttpStatus status;
    private final String message;
}
