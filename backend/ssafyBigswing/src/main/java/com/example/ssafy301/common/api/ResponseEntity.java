package com.example.ssafy301.common.api;

import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.common.api.status.SuccessCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;

// responseEntity 클래스
@Getter
public class ResponseEntity<T> {
    private int status;
    private String message;
    private T resultData;

    public ResponseEntity(int status, String message, T resultData) {
        this.status = status;
        this.message = message;
        this.resultData = resultData;
    }

    public ResponseEntity(int status, String message) {
        this.status = status;
        this.message = message;
    }

    // 성공했을 때 반환해줄 ResponseEntity
    public static <T> ResponseEntity<T> success(SuccessCode code) {
        return new ResponseEntity<>(code.getStatus().value(), code.getMessage());
    }

    public static <T> ResponseEntity<T> success(SuccessCode code, T resultData) {
        return new ResponseEntity<>(code.getStatus().value(), code.getMessage(), resultData);
    }

    // 실패했을 때 반환해줄 ResponseEntity
    public static <T> ResponseEntity<T> fail(FailCode code) {
        return new ResponseEntity<>(code.getStatus().value(), code.getMessage());
    }
    
}
