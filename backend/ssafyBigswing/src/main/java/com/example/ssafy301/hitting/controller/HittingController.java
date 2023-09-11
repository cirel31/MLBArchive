package com.example.ssafy301.hitting.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.hitting.dto.HittingReqDto;
import com.example.ssafy301.hitting.dto.HittingRespDto;
import com.example.ssafy301.hitting.service.HittingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hitting")
public class HittingController {

    private final HittingService hittingService;
    @GetMapping("/detail")
    public ResponseEntity getHittingDetail(@RequestBody HittingReqDto hittingReqDto) {
        HittingRespDto result = hittingService.getHittingStat(hittingReqDto);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);

    }
}
