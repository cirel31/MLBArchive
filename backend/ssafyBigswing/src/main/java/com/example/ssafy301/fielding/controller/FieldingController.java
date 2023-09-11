package com.example.ssafy301.fielding.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.fielding.dto.FieldingReqDto;
import com.example.ssafy301.fielding.dto.FieldingRespDto;
import com.example.ssafy301.fielding.service.FieldingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/fielding")
public class FieldingController {

    private final FieldingService fieldingService;
    @GetMapping("/detail")
    public ResponseEntity getFieldingDetail(@RequestBody FieldingReqDto fieldingReqDto) {
        FieldingRespDto result = fieldingService.getFieldingStat(fieldingReqDto);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);

    }
}
