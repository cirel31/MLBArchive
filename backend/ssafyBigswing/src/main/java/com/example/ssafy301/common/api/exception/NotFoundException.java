package com.example.ssafy301.common.api.exception;

import com.example.ssafy301.common.api.status.FailCode;
import lombok.Getter;

@Getter
public class NotFoundException extends RuntimeException {

    private final FailCode failCode;

    public NotFoundException(FailCode failCode) {
        super(failCode.getMessage());
        this.failCode = failCode;
    }
}
