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
    NO_FIELDING_STAT(BAD_REQUEST, "관련된 수비 성적이 존재하지 않습니다"),
    NO_HITTING_STAT(BAD_REQUEST, "관련된 타석 성적이 존재하지 않습니다"),
    NO_PITCHING_STAT(BAD_REQUEST, "관련된 투구 성적이 존재하지 않습니다");


    private final HttpStatus status;
    private final String message;
}
