"use client";
import { useEffect, useState } from "react";
import "../../../styles/TeamPage.css";
import { useSelector } from "react-redux";
import Image from "next/image";
import { selectLogo, selectTwitter } from "@/app/components/team/teamData";
import { Layout, Space } from "antd";
import News from "./news";

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
  const teamDetailData = useSelector((state: any) => state.team.teamData);
  const searchId = teamDetailData?.id ?? 120;
  const logoPath = selectLogo(searchId);
  const twitterPath = selectTwitter(searchId);

  useEffect(() => {
    if (teamDetailData) {
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
          </Content>
          <Footer style={footerStyle}>
            <a href={twitterPath}>트위터 넣어 줌, {twitterPath}</a>
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default DetailTeamPage;
