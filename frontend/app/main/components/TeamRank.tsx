"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { selectLogo } from "@/app/components/team/teamData";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import Link from "next/link";

type RecordType = {
  wins: number;
  losses: number;
  pct: number;
};

type TeamData = {
  rank: string;
  teamId: string;
  teamName: string;
  record: RecordType[];
};

type League = {
  leagueId: string;
  divisionId: string;
  teams: TeamData[];
};
const TeamRank = () => {
  const [teamList, setTeamList] = useState<League[]>([]);
  const router = useRouter();
  useEffect(() => {
    axios
      .get("https://statsapi.mlb.com/api/v1/standings?leagueId=103,104")
      .then((response) => {
        const newTeamList: League[] = [];
        for (let i = 0; i < 6; i++) {
          const leagueData = response.data.records[i];
          const leagueObj: League = {
            leagueId: leagueData.league.id,
            divisionId: String(leagueData.division.id),
            teams: [],
          };
          for (let j = 0; j < 5; j++) {
            const teamData = leagueData.teamRecords[j];
            console.log(teamData.leagueRecord);
            leagueObj.teams.push({
              rank: teamData.leagueRank,
              teamId: teamData.team.id,
              teamName: teamData.team.name,
              record: teamData.leagueRecord,
            });
          }
          newTeamList.push(leagueObj);
        }
        setTeamList(newTeamList);
      })
      .catch(() => {});
  }, []);
  const leagueMapping: { [key: string]: string } = {
    103: "아메리칸 리그",
    104: "내셔널 리그",
  };
  const divisionMapping: { [key: string]: string } = {
    201: "동부",
    202: "중부",
    200: "서부",
    204: "동부",
    205: "중부",
    203: "서부",
  };
  const flatTeamData = teamList.flatMap((league) =>
    league.teams.map((team: any) => ({
      ...team,
      key: team.teamId,
      leagueId: leagueMapping[league.leagueId],
      divisionId: divisionMapping[league.divisionId],
    }))
  );
  const columns: any = [
    {
      title: "리그 이름",
      dataIndex: "leagueId",
      render: (text:string, record: League, index:number) => (
        <p key={index}>{record.leagueId}</p>
      ),
    },
    {
      title: "지역 이름",
      dataIndex: "divisionId",
      render: (text:string, record: League, index:number) => (
        <p key={index}>{record.divisionId}</p>
      ),
    },
    {
      title: "팀 이름",
      dataIndex: "teamName",
      key: "teamName",
      render: (text:string, record: TeamData) => (
        <p onClick={() => router.push(`/team/${record.teamId}`)}>{text}</p>
      ),
    },
    {
      title: "승",
      dataIndex: "record",
      key: "wins",
      render: (record: RecordType) => record.wins,
    },
    {
      title: "패",
      dataIndex: "record",
      key: "losses",
      render: (record: RecordType) => record.losses,
    },
    {
      title: "PCT",
      dataIndex: "record",
      key: "pct",
      render: (record: RecordType) => record.pct,
    },
  ];

  return (
    <div className="TeamRank_box">
      <h3 className="TeamRank_box2">Team Rank</h3>
      <Table
        className="TeamRank_box"
        columns={columns}
        // dataSource={teamList.flatMap((league) => league.teams)}
        dataSource={flatTeamData}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default TeamRank;
