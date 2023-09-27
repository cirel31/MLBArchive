"use client";
import React, { useEffect, useState } from "react";
import "../../../styles/TeamPage.css";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { selectLogo, selectTwitter } from "@/app/components/team/teamData";
import { InputNumber, Layout, Space, Card, Collapse } from "antd";
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

  useEffect(() => {
    if (teamData) {4
      setIsLoading(false);
    }
  });
  if (isLoading) {
    console.log("로딩 중...");
  }

  const splitActiveYears = (activeYears: number) => {
    // activeYears를 문자열로 변환하고, ,를 모두 제거합니다.
    const activeYearsStr = activeYears.toString().replace(/,/g, "");

    const regex = /.{1,4}/g; // 4글자씩 자를 정규식
    return activeYearsStr.match(regex) || []; // 정규식에 맞게 자른 결과를 배열로 반환
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "활동년도",
      children: teamData
        ? splitActiveYears(teamData.activeYears).map((segment, index) => (
            <p key={index}>{segment}</p>
          ))
        : null,
    },
  ];
  return (
    <>
      {/* <TeamInfo /> */}
      {/* <News /> */}
      <Layout>
        <Sider style={siderStyle}>
          {/* <Image className="teamlogo" src={logoPath} alt="이미지 없음" /> */}
          {teamData && (
            <>
              <Card
                hoverable
                style={{ width: 240 }}
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
                  <Collapse accordion>
                    <Collapse.Panel key="1" header="활동년도">
                      <div style={{ maxHeight: "200px", overflowY: "auto" }}>
                        {teamData
                          ? splitActiveYears(teamData.activeYears).map(
                              (segment, index) => <p key={index}>{segment}</p>
                            )
                          : null}
                      </div>
                    </Collapse.Panel>
                  </Collapse>
                </div>
              </Card>

              {/* <TeamInfo activeYears={teamData.activeYears} /> */}
            </>
          )}
        </Sider>
        <Layout>
          <Header style={headerStyle}>
            <p>아무거나 팀 이미지 하나씩 넣기</p>
          </Header>
          <Content style={contentStyle}>
            팀관련데이터
            {/* <News /> */}
            {teamData && (
              <div>
                {/* <div>{teamData.activeYears}</div> */}

                {/* <div>{teamData.createdYear}</div> */}
                <div>{teamData.korName}</div>
                {/* <div>{teamData.teamName}</div> */}
                {/* <div>{teamData.teamLocation}</div>` */}
              </div>
            }
            <select
              value={seasonData}
              onChange={e => setSeasonData(parseInt(e.target.value))}
            >
              {teamData?.activeYears.map((year:number) => (
                <option key={year} value={year} style={{ color: "black" }}>{year}</option>
              ))
              }
            </select>
            <button onClick={() => setSeason(seasonData)}>조회</button>
            <TeamStat teamId={teamId} season={season} />
            <TeamRoster teamId={teamId} season={season} />
          </Content>
          <Footer style={footerStyle}>
            <a href={twitterPath}>{twitterPath}</a>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default DetailTeamPage;
