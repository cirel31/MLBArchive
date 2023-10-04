package com.example.ssafy301.match.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MatchSearchDto {
    private Long teamId;
    private LocalDate start;
    private LocalDate end;
}
