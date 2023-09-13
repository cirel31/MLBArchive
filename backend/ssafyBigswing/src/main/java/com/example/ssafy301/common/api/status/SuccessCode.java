package com.example.ssafy301.common.api.status;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.*;

@Getter
@AllArgsConstructor
public enum SuccessCode {

    GENERAL_SUCCESS(OK, "데이터 처리 성공");

    private final HttpStatus status;
    private final String message;
}
