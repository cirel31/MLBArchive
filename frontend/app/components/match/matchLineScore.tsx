import React from "react";
import { useSelector } from "react-redux";
import { Table } from "antd";
// import "@/styles/MatchLineScore.css";
import game from "@/assets/game.png";
import Image from "next/image";

const MatchLineScore = () => {
  const gameData = useSelector((state) => state.match.matchLineScore);
  const lineScore = useSelector(
    (state) => state.match.matchLineScore?.linescore
  );
  const innings = useSelector((state) =>
    state.match.matchLineScore?.linescore?.innings
      ? Object.values(state.match.matchLineScore.linescore.innings)
      : []
  );

  const teams = useSelector((state) =>
    state.match.matchLineScore?.linescore?.teams
      ? Object.values(state.match.matchLineScore.linescore.teams)
      : []
  );

  console.log(gameData);

  // away 팀의 이닝 득점 합계 계산
  const awayRunsTotal = innings.reduce(
    (total, inning) => total + inning.away.runs,
    0
  );

  // home 팀의 이닝 득점 합계 계산
  const homeRunsTotal = innings.reduce(
    (total, inning) => total + inning.home.runs,
    0
  );

  // H (안타)와 E (에러) 데이터 가져오기
  const awayHits = lineScore?.away?.hits;
  const awayErrors = lineScore?.away?.errors;
  const homeHits = lineScore?.home?.hits;
  const homeErrors = lineScore?.home?.errors;

  // 테이블 컬럼 정의
  const columns = [
    {
      title: "이닝",
      dataIndex: "inning",
      key: "inning",
    },
    ...innings.map((inning, index) => ({
      title: `${index + 1}`,
      dataIndex: `inning_${index}`,
      key: `inning_${index}`,
    })),
    {
      title: "R",
      dataIndex: "runs",
      key: "runs",
      render: (text, record) => {
        if (record.key === "away") {
          return awayRunsTotal;
        } else if (record.key === "home") {
          return homeRunsTotal;
        }
        return text;
      },
    },
    {
      title: "H",
      dataIndex: "hits",
      key: "hits",
      render: (text, record) => {
        if (record.key === "away") {
          return teams[0].hits;
        } else if (record.key === "home") {
          return teams[1].hits;
        }
        return text;
      },
    },
    {
      title: "E",
      dataIndex: "errors",
      key: "errors",
      render: (text, record) => {
        if (record.key === "away") {
          return teams[0].errors;
        } else if (record.key === "home") {
          return teams[1].errors;
        }
        return text;
      },
    },
  ];

  // 테이블 데이터 생성
  const tableData = [
    {
      key: "away",
      inning: "away",
      ...innings.reduce((data, inning, index) => {
        data[`inning_${index}`] = inning.away.runs;
        data[`runs`] = awayRunsTotal; // away 팀의 이닝 득점 합계
        data[`hits`] = awayHits; // away 팀의 안타
        data[`errors`] = awayErrors; // away 팀의 에러
        return data;
      }, {}),
    },
    {
      key: "home",
      inning: "home",
      ...innings.reduce((data, inning, index) => {
        data[`inning_${index}`] = inning.home.runs;
        data[`runs`] = homeRunsTotal; // home 팀의 이닝 득점 합계
        data[`hits`] = homeHits; // home 팀의 안타
        data[`errors`] = homeErrors; // home 팀의 에러
        return data;
      }, {}),
    },
  ];

  return (
    <>
      {gameData && (
        <div>
          <div className="team_name_match2">경기일: {gameData.game_date}</div>
          <Image src={game} alt="경기" style={{ margin: "0 auto" }} />
          {/* <div>전체 이닝: {lineScore.currentInning}</div> */}
          <div>
            {/* 점수 표시 */}
            {innings.length > 0 && (
              <Table
                className="rotated-table"
                dataSource={tableData}
                columns={columns}
                pagination={false}
                style={{ color: "black", marginTop: "20px" }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MatchLineScore;
