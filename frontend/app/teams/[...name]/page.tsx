"use client";
import { useEffect, useState } from "react";
import "../../../styles/TeamPage.css";
import {useDispatch, useSelector} from "react-redux";
import Image from "next/image";
import { selectLogo, selectTwitter } from "@/app/components/team/teamData";
import {InputNumber, Layout, Space} from "antd";
import News from "./news";
import {teamDetailData} from "@/app/redux/features/teamSlice";
import TeamStat from "@/app/components/team/teamStat";
import TeamRoster from "@/app/components/team/teamRoster";

const { Header, Footer, Sider, Content } = Layout;

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
  const [season, setSeason] = useState(2023)
  const [seasonData, setSeasonData] = useState(new Date().getFullYear());
  const MIN_YEAR: number = 1903;
  const MAX_YEAR = new Date().getFullYear();
  const dispatch = useDispatch()
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
    if (teamData) {
      setIsLoading(false);
    }
  });
  if (isLoading) {
    console.log("로딩 중...");
  }
  return (
    <>
      {/* <News /> */}
      <Layout>
        <Sider style={siderStyle}>
          <Image className="teamlogo" src={logoPath} alt="이미지 없음" />
        </Sider>
        <Layout>
          <Header style={headerStyle}>
            <p>아무거나 팀 이미지 하나씩 넣기</p>
          </Header>
          <Content style={contentStyle}>
            팀관련데이터
            {/* <News /> */}
            {teamData &&
              <div>
                <div>{teamData.activeYears}</div>
                <div>{teamData.createdYear}</div>
                <div>{teamData.korName}</div>
                <div>{teamData.teamName}</div>
                <div>{teamData.teamLocation}</div>
              </div>
            }

            <InputNumber
              type="number"
              min={MIN_YEAR}
              max={MAX_YEAR}
              value={seasonData}
              onChange={(value) => setSeasonData(value ?? seasonData)}
            />
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
