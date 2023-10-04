package com.example.ssafy301.seasonRoster.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SeasonRosterReqDto {
    private Long teamId;
    private int season;
}
