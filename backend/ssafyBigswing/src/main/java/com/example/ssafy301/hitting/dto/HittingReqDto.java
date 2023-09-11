package com.example.ssafy301.hitting.dto;

import com.example.ssafy301.fielding.domain.Fielding;
import com.example.ssafy301.fielding.repository.FieldingRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HittingReqDto {
    private Long playerId;
    private int season;
}
