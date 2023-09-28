"use client";
import React, { useEffect, useState } from "react";
import "../../../styles/TeamPage.css";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import {
  selectLogo,
  selectTwitter,
  selectTeam,
} from "@/app/components/team/teamData";
import { InputNumber, Layout, Space, Card, Collapse, Select } from "antd";
import type { CollapseProps } from "antd";
import News from "./news";
import { teamDetailData } from "@/app/redux/features/teamSlice";
import TeamStat from "@/app/components/team/teamStat";
import TeamRoster from "@/app/components/team/teamRoster";
import TeamInfo from "./TeamInfo";

const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

const DetailTeamPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teamId, setTeamId] = useState("");
  const [season, setSeason] = useState(2023);
  const [seasonData, setSeasonData] = useState(new Date().getFullYear());
  const MIN_YEAR: number = 1903;
  const MAX_YEAR = new Date().getFullYear();
  const dispatch = useDispatch();
  useEffect(() => {
    const parsing = window.location.href.split("teams/")[1];
    setTeamId(parsing);
    dispatch(teamDetailData(parsing));
  }, [teamId]);
  const teamData = useSelector((state: any) => state.team.teamData);
  const searchId = teamData?.id ?? 120;
  const logoPath = selectLogo(searchId);
  const twitterPath = selectTwitter(searchId);
  const teamPath = selectTeam(searchId);

  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    if (teamData) {
      4;
      setIsLoading(false);
    }
  });
  if (isLoading) {
    console.log("로딩 중...");
  }

  const splitActiveYears = (activeYears: number) => {
    const activeYearsStr = activeYears.toString().replace(/,/g, "");
    const regex = /.{1,4}/g;
    return (activeYearsStr.match(regex) || []).map((segment) => ({
      value: segment,
      label: segment,
    }));
  };

  const handleChange = (value: string) => {
    setSelectedYear(value); // 선택한 연도를 상태에 업데이트
    setSeason(value); // 선택한 연도로 조회를 실행
  };

  return (
    <>
      <div className="header">
        <div>
          {teamData && (
            <>
              <Card
                hoverable
                style={{ width: 240, border: "5px solid rgb(6, 31, 77)" }}
                cover={
                  <Image
                    className="teamlogo"
                    src={logoPath}
                    alt="이미지 없음"
                    style={{ width: "200px" }}
                  />
                }
              >
                <Meta
                  title={teamData.teamName}
                  description={new Date(
                    teamData.createdYear
                  ).toLocaleDateString()}
                />
                <a href={twitterPath}>{twitterPath}</a>
                <div style={{ margin: "10px" }}>
                  <p>활동 내역 조회</p>
                  <Select
                    value={selectedYear}
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={
                      teamData
                        ? splitActiveYears(teamData.activeYears).reverse()
                        : []
                    }
                  />
                </div>

                <TeamStat teamId={teamId} season={season} />
              </Card>
            </>
          )}
        </div>
        <div>
          <Image src={teamPath} style={{ width: "100%", height: "450px" }} />
          <div className="roster">
            <TeamRoster teamId={teamId} season={season} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailTeamPage;
