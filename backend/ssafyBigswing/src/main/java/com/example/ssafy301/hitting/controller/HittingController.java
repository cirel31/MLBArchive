package com.example.ssafy301.hitting.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.hitting.dto.HittingReqDto;
import com.example.ssafy301.hitting.dto.HittingRespDto;
import com.example.ssafy301.hitting.dto.TopHitter;
import com.example.ssafy301.hitting.service.HittingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/hitting")
public class HittingController {

    private final HittingService hittingService;
    @GetMapping("/detail")
    public ResponseEntity getHittingDetail(@ModelAttribute HittingReqDto hittingReqDto) {
        HittingRespDto result = hittingService.getHittingStat(hittingReqDto);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }

    // 타격 스탯 Top5 목록
    @GetMapping("/top5")
    public ResponseEntity getTop5Hitter() {
        List<TopHitter> top5Hitter = hittingService.getTop5Hitter();
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, top5Hitter);
    }
}
