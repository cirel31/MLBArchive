"use client"
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {selectLogo} from "@/app/components/team/teamData";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Category 1",
        value: "Category 1",
        children: [
          {
            text: "Yellow",
            value: "Yellow",
          },
          {
            text: "Pink",
            value: "Pink",
          },
        ],
      },
      {
        text: "Category 2",
        value: "Category 2",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value: string, record) => record.name.includes(value),
    width: "30%",
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value: string, record) => record.address.startsWith(value),
    filterSearch: true,
    width: "40%",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const onChange: TableProps<DataType>["onChange"] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log("params", pagination, filters, sorter, extra);
};


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
            divisionId: leagueData.division.id,
            teams: []
          };
          for (let j = 0; j < 5; j++) {
            const teamData = leagueData.teamRecords[j];
            console.log(teamData.leagueRecord)
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


  return (
    <>
     <h3>Team Rank</h3>
     <Table columns={columns} dataSource={data} onChange={onChange} />
      <div>
        {teamList.length > 0 ?
          teamList.map((content: any, index1) => (
            <div key={index1}>
              <div>
                {(content.leagueId === 103) && <p>아메리칸 리그</p> }
                {(content.divisionId === 201) && <p>동부</p>}
                {(content.divisionId === 202) && <p>중부</p>}
                {(content.divisionId === 200) && <p>서부</p>}
                {(content.leagueId === 104) && <p>내셔널 리그</p>}
                {(content.divisionId === 204) && <p>동부</p>}
                {(content.divisionId === 205) && <p>중부</p>}
                {(content.divisionId === 203) && <p>서부</p>}
              </div>
              {content.teams.map((team:any, index2:number) => (
                <div key={index2} onClick={() => router.push(`/teams/${team.teamId}`)}>
                  {/*<Image src={selectLogo(team.teamId)} alt="로고" />*/}
                  <p>{team.teamName}</p>
                  <p>승: {team.record.wins}, 패: {team.record.losses}, pct: {team.record.pct}</p>
                </div>
              ))}
            </div>
          )) :
          <p>받아온 팀 정보 없음</p>
        }
      </div>
    </>
  )
}

export default TeamRank