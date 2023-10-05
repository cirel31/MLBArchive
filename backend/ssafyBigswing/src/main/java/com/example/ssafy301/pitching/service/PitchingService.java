package com.example.ssafy301.pitching.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.pitching.domain.Pitching;
import com.example.ssafy301.pitching.dto.PitchingReqDto;
import com.example.ssafy301.pitching.dto.PitchingRespDto;
import com.example.ssafy301.pitching.dto.TopPitcher;
import com.example.ssafy301.pitching.repository.PitchingRepository;
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
public class PitchingService {

    private final PitchingRepository pitchingRepository;
    
    // playerId와 season을 입력해서, 관련된 stat 정보를 가져온다
    public PitchingRespDto getPitchingStat(PitchingReqDto pitchingReqDto) {
        List<Pitching> pitchingStats = pitchingRepository.getPitchingsByPlayerIdAndSeason(pitchingReqDto.getPlayerId(), pitchingReqDto.getSeason());
        
        // 입력된 선수와 시즌과 관련된 스탯이 없다면 예외 발생
        if(pitchingStats.isEmpty()) {
            throw new NotFoundException(FailCode.NO_PITCHING_STAT);
        }

        // Pitching값이 여러개라면 가장 게임수가 많은 스탯만 뽑아냄
        Pitching mostPlayedPitching = Collections.max(pitchingStats, Comparator.comparingInt(Pitching::getGamesPlayed));

        return new PitchingRespDto(mostPlayedPitching);
    }

    // 선수 비교를 위한 메서드
    public PitchingRespDto getPitchingStat2(PitchingReqDto pitchingReqDto) {
        List<Pitching> pitchingStats = pitchingRepository.getPitchingsByPlayerIdAndSeason(pitchingReqDto.getPlayerId(), pitchingReqDto.getSeason());

        // 입력된 선수와 시즌과 관련된 스탯이 없다면 예외 발생
        if(pitchingStats.isEmpty()) {
            return null;
        }

        // Pitching값이 여러개라면 가장 게임수가 많은 스탯만 뽑아냄
        Pitching mostPlayedPitching = Collections.max(pitchingStats, Comparator.comparingInt(Pitching::getGamesPlayed));

        return new PitchingRespDto(mostPlayedPitching);
    }

    // 현재 시즌의 모든 투수 중 pitching 순위(era가 낮을수록 높은 순위) TOP5 목록을 가져온다
    // 선수사진, 선수이름, 방어율율, 속한팀 이름을 반환
    public List<TopPitcher> getTop5Pitcher() {

        int currentYear = LocalDate.now().getYear();

        // 우선 season으로 모든 pitching 정보를 갖고 온 후
        // 그 중 era가 낮은 순으로 TOP5만 가져오자
        List<Pitching> pitchingsBySeason = pitchingRepository.getPitchingsBySeason(currentYear);
        List<Pitching> top5Pitching = pitchingsBySeason.stream()
                .sorted((pitch1, pitch2) -> Float.compare(pitch1.getEra(), pitch2.getEra())) // 오름차순 정렬
                .limit(5) // 상위 5개만 가져옴
                .collect(Collectors.toList());

        List<TopPitcher> result = new ArrayList<>();
        for (Pitching pitching : top5Pitching) {
            result.add(new TopPitcher(pitching));
        }

        return result;
    }

}
