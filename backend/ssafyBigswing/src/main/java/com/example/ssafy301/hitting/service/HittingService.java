package com.example.ssafy301.hitting.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.hitting.domain.Hitting;
import com.example.ssafy301.hitting.dto.HittingReqDto;
import com.example.ssafy301.hitting.dto.HittingRespDto;
import com.example.ssafy301.hitting.dto.TopHitter;
import com.example.ssafy301.hitting.repository.HittingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HittingService {

    private final HittingRepository hittingRepository;
    
    // playerId와 season을 입력해서, 관련된 stat 정보를 가져온다
    public HittingRespDto getHittingStat(HittingReqDto hittingReqDto) {
        List<Hitting> hittingStats = hittingRepository.getHittingsByPlayerIdAndSeason(hittingReqDto.getPlayerId(), hittingReqDto.getSeason());
        
        // 입력된 선수와 시즌과 관련된 스탯이 없다면 예외 발생
        if(hittingStats.isEmpty()) {
            throw new NotFoundException(FailCode.NO_HITTING_STAT);
        }

        Hitting mostPlayedHitting = Collections.max(hittingStats, Comparator.comparingInt(Hitting::getGamesPlayed));

        return new HittingRespDto(mostPlayedHitting);
    }

    // 선수 비교를 위한 메서드
    public HittingRespDto getHittingStat2(HittingReqDto hittingReqDto) {
        List<Hitting> hittingStats = hittingRepository.getHittingsByPlayerIdAndSeason(hittingReqDto.getPlayerId(), hittingReqDto.getSeason());

        // 입력된 선수와 시즌과 관련된 스탯이 없다면 예외 발생
        if(hittingStats.isEmpty()) {
            return null;
        }

        Hitting mostPlayedHitting = Collections.max(hittingStats, Comparator.comparingInt(Hitting::getGamesPlayed));

        return new HittingRespDto(mostPlayedHitting);
    }


    // 현재 시즌의 모든 타자 중 hitting 순위(battingAvg가 높을수록 높은 순위) TOP5 목록을 가져온다
    // 선수사진, 선수이름, 타율, 속한팀 이름을 반환
    public List<TopHitter> getTop5Hitter() {

        int currentYear = LocalDate.now().getYear();

        // 우선 season으로 모든 hitting 정보를 갖고 온 후
        // 타수(atBats)가 5 이상인 선수만 남겨두고
        // 그 중 TOP5만 가져오자
        List<Hitting> hittingsBySeason = hittingRepository.getHittingsBySeason(currentYear);
        List<Hitting> top5Hitting = hittingsBySeason.stream()
                .filter(hit -> hit.getAtBats() >= 5)
                .sorted((hit1, hit2) -> Float.compare(hit2.getBattingAvg(), hit1.getBattingAvg())) // 내림차순 정렬
                .limit(5) // 상위 5개만 가져옴
                .collect(Collectors.toList());

        List<TopHitter> result = new ArrayList<>();
        for (Hitting hitting : top5Hitting) {
            result.add(new TopHitter(hitting));
        }

        return result;
    }
}
