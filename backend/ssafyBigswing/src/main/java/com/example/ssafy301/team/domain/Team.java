package com.example.ssafy301.team.domain;

import com.example.ssafy301.teamStat.domain.TeamStat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Team {

    @Id
    @Column(name = "team_id")
    private Long id;

    @Column(name = "team_name")
    private String teamName;
    private String korName;

    private String createdYear;

    @Column(name = "team_logo")
    private String teamLogo;

    @Column(name = "team_location")
    private String teamLocation;

    @OneToMany(mappedBy = "team")
    List<TeamStat> teamStats;
}
