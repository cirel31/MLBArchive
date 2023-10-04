package com.example.ssafy301.simulation.dto;

import com.example.ssafy301.hitting.domain.Hitting;
import com.example.ssafy301.pitching.domain.Pitching;
import com.example.ssafy301.player.domain.Player;
import com.example.ssafy301.player.domain.Position;
import com.example.ssafy301.player.domain.UseHand;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class PlayerSearchRespDto {

    // 선수 관련 정보
    private List<PitcherSearchRespDto> pitchers = new ArrayList<>(); // 투수만 모아놨습니다(pitching 스탯만 있음)
    private List<OtherPositionSearchRespDto> others = new ArrayList<>(); // 투수랑 twoway가 둘다 아닌 선수만 모아놨습니다(hitting 스탯만 있음)
    private List<TwoWayRespDto> twoWays = new ArrayList<>(); // 투수랑 타자 둘 다 가능한 선수만 모아놨습니다(ex. 오타니 쇼헤이) (pitching, hitting 스탯 다 있음)

    public void addPitcher(PitcherSearchRespDto pitcher) {
        pitchers.add(pitcher);
    }

    public void addOthers(OtherPositionSearchRespDto other) {
        others.add(other);
    }

    public void addTwoWay(TwoWayRespDto twoWay) {
        twoWays.add(twoWay);
    }


}
