package com.example.ssafy301.simulation.dto;

import com.example.ssafy301.simulation.dto.SimulationMembersJsonDto.Player;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SimulationResponseDto {
    private List<Player> homeTeamBatters;
    private List<Player> homeTeamPitchers;
    private List<Player> awayTeamBatters;
    private List<Player> awayTeamPitchers;
}