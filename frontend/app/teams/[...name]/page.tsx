"use client";
import React, { useEffect, useState } from "react";
import "../../../styles/TeamPage.css";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { selectLogo, selectTwitter } from "@/app/components/team/teamData";
import { InputNumber, Layout, Space, Card, Collapse, Select } from "antd";
import type { CollapseProps } from "antd";
import News from "./news";
import { teamDetailData } from "@/app/redux/features/teamSlice";
import TeamStat from "@/app/components/team/teamStat";
import TeamRoster from "@/app/components/team/teamRoster";
import TeamInfo from "./TeamInfo";

const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: "20vh",
  paddingInline: 50,
  backgroundColor: "#7dbcea",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  height: "20vh",
  color: "#fff",
  backgroundColor: "#108ee9",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  // lineHeight: "100%",
  height: "100vh",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
  height: "10vh",
};

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
      <Layout>
        <div style={{ display: "flex" }}>
          <Sider style={siderStyle}>
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
          </Sider>

          <div>
            <Layout>
              <Header style={headerStyle}>
                <p>아무거나 팀 이미지 하나씩 넣기</p>
              </Header>
              {/* <Content style={contentStyle}> */}
              팀관련데이터
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  width: "100%",
                  height: "100%",
                }}
              >
                {teamData && (
                  <div>
                    <div>{teamData.korName}</div>
                    <Image src={teamData.logo} alt="" />
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <TeamRoster teamId={teamId} season={season} />
                </div>
              </div>
              {/* </Content> */}
              <Footer style={footerStyle}>
                <a href={twitterPath}>{twitterPath}</a>
              </Footer>
            </Layout>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default DetailTeamPage;
