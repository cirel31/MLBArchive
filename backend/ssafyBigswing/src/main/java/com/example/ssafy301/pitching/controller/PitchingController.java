package com.example.ssafy301.pitching.controller;

import com.example.ssafy301.common.api.ResponseEntity;
import com.example.ssafy301.common.api.status.SuccessCode;
import com.example.ssafy301.pitching.dto.PitchingReqDto;
import com.example.ssafy301.pitching.dto.PitchingRespDto;
import com.example.ssafy301.pitching.dto.TopPitcher;
import com.example.ssafy301.pitching.service.PitchingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pitching")
public class PitchingController {

    private final PitchingService pitchingService;
    @GetMapping("/detail")
    public ResponseEntity getPitchingDetail(@ModelAttribute PitchingReqDto pitchingReqDto) {
        PitchingRespDto result = pitchingService.getPitchingStat(pitchingReqDto);
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, result);
    }
    
    // 투구 스탯 Top5 목록
    @GetMapping("/top5")
    public ResponseEntity getTop5Pitcher() {
        List<TopPitcher> top5Pitcher = pitchingService.getTop5Pitcher();
        return ResponseEntity.success(SuccessCode.GENERAL_SUCCESS, top5Pitcher);
    }
    
}
