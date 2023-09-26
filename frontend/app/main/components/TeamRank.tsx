"use client"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {selectLogo} from "@/app/components/team/teamData";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

type RecordType = {
  wins: number;
  losses: number;
  pct: number;
}

type TeamData = {
  key: string;
  teamId: string;
  teamName: string;
  record: RecordType;
}

type League = {
  leagueId: string;
  divisionId: string;
  teams: any;
}
const TeamRank = () => {
  const [teamList, setTeamList] = useState<League[]>([])
  const router = useRouter()
  useEffect(() => {
    axios.get('https://statsapi.mlb.com/api/v1/standings?leagueId=103,104')
      .then((response) => {
        const newTeamList: League[] = [];
        for (let i = 0; i < 6; i++) {
          const leagueData = response.data.records[i];
          const leagueObj: League = {
            leagueId: leagueData.league.id,
            divisionId: String(leagueData.division.id),
            teams: []
          };
          for (let j = 0; j < 5; j++) {
            const teamData = leagueData.teamRecords[j];
            leagueObj.teams.push({
              rank: teamData.leagueRank,
              teamId: teamData.team.id,
              teamName: teamData.team.name,
              record: teamData.leagueRecord
            });
          }
          newTeamList.push(leagueObj);
        }
        setTeamList(newTeamList);
      })
      .catch(() => {
      });
  }, []);
  const leagueMapping: {[key: string]: string } = {
    103: "아메리칸 리그",
    104: "내셔널 리그",
  };
  const divisionMapping: {[key: string]: string } = {
    201: '동부',
    202: '중부',
    200: '서부',
    204: '동부',
    205: '중부',
    203: '서부'
  };
  const flatTeamData = teamList.flatMap(league => league.teams.map((team:any) => ({
    ...team,
    key: team.teamId,
    leagueId: leagueMapping[league.leagueId],
    divisionId: divisionMapping[league.divisionId]
  })));
  const columns = [
    {
      title: '리그 이름',
      dataIndex: 'leagueId',
      key: 'leagueId',
    },
    {
      title: '지역 이름',
      dataIndex: 'divisionId',
      key: 'divisionId',
    },
    {
      title: '팀 이름',
      dataIndex: 'teamName',
      key: 'teamName',
    },
    {
      title: '승',
      dataIndex: 'record',
      key: 'wins',
      render: (record: RecordType) => record.wins,
    },
    {
      title: '패',
      dataIndex: 'record',
      key: 'losses',
      render: (record: RecordType) => record.losses,
    },
    {
      title: 'PCT',
      dataIndex: 'record',
      key: 'pct',
      render: (record: RecordType) => record.pct,
    },
  ];

  return (
    <>
     <h3>Team Rank</h3>
      <Table columns={columns} dataSource={flatTeamData} pagination={{ pageSize: 5 }} />
      {/*<div>*/}
      {/*  {teamList.length > 0 ?*/}
      {/*    teamList.map((content: any, index1) => (*/}
      {/*      <div key={index1}>*/}
      {/*        <div>*/}
      {/*          {(content.leagueId === 103) && <p>아메리칸 리그</p> }*/}
      {/*          {(content.divisionId === 201) && <p>동부</p>}*/}
      {/*          {(content.divisionId === 202) && <p>중부</p>}*/}
      {/*          {(content.divisionId === 200) && <p>서부</p>}*/}
      {/*          {(content.leagueId === 104) && <p>내셔널 리그</p>}*/}
      {/*          {(content.divisionId === 204) && <p>동부</p>}*/}
      {/*          {(content.divisionId === 205) && <p>중부</p>}*/}
      {/*          {(content.divisionId === 203) && <p>서부</p>}*/}
      {/*        </div>*/}
      {/*        {content.teams.map((team:any, index2:number) => (*/}
      {/*          <div key={index2} onClick={() => router.push(`/teams/${team.teamId}`)}>*/}
      {/*            /!*<Image src={selectLogo(team.teamId)} alt="로고" />*!/*/}
      {/*            <p>{team.teamName}</p>*/}
      {/*            <p>승: {team.record.wins}, 패: {team.record.losses}, pct: {team.record.pct}</p>*/}
      {/*          </div>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    )) :*/}
      {/*    <p>받아온 팀 정보 없음</p>*/}
      {/*  }*/}
      {/*</div>*/}
    </>
  )
}

export default TeamRank