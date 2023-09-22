package com.example.ssafy301.simulation.dto;

import com.example.ssafy301.seasonRoster.dto.SeasonRosterDto;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class SimulationMembersDto {
    List<SeasonRosterDto> homeMembers;
    List<SeasonRosterDto> awayMembers;

    public SimulationMembersDto(List<SeasonRosterDto> homeMembers, List<SeasonRosterDto> awayMembers) {
        this.homeMembers = new ArrayList<>(homeMembers);
        this.awayMembers = new ArrayList<>(awayMembers);
    }
}
