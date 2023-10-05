package com.example.ssafy301.simulation.dto;

import com.example.ssafy301.simulation.dto.SimulationMembersJsonDto.Players;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimulationResponseDto {
    private List<Players> homeTeamBatters;
    private List<Players> homeTeamPitchers;
    private List<Players> awayTeamBatters;
    private List<Players> awayTeamPitchers;
}