package com.example.ssafy301.player.service;

import com.example.ssafy301.common.api.exception.NotFoundException;
import com.example.ssafy301.common.api.status.FailCode;
import com.example.ssafy301.player.domain.Player;
import com.example.ssafy301.player.dto.PlayerDetailDto;
import com.example.ssafy301.player.repository.PlayerRepository;
import com.example.ssafy301.seasonRoster.domain.SeasonRoster;
import com.example.ssafy301.seasonRoster.repository.SeasonRosterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final SeasonRosterRepository seasonRosterRepository;

    // 선수 상세정보 조회
    public PlayerDetailDto getDetailPlayer(Long playerId) {
        Player player = playerRepository.findById(playerId).orElseThrow(() -> new NotFoundException(FailCode.NO_PLAYER));

        // 해당 선수가 활동했던 연도도 보내주자
        List<Integer> activeYears = seasonRosterRepository.getSeasonRostersByPlayerId(playerId)
                .stream()
                .map(SeasonRoster::getSeason) // SeasonRoster에서 연도만 추출
                .distinct() // 중복 제거
                .collect(Collectors.toList()); // List<Integer>로 변환

        return new PlayerDetailDto(player, activeYears);
    }

    // 선수 검색
}
