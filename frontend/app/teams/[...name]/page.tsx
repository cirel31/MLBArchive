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
import {
  InputNumber,
  Layout,
  Space,
  Card,
  Collapse,
  Select,
  Button,
} from "antd";
import type { CollapseProps } from "antd";
import News from "./news";
import { teamDetailData } from "@/app/redux/features/teamSlice";
import TeamStat from "@/app/components/team/teamStat";
import TeamRoster from "@/app/components/team/teamRoster";
import TeamInfo from "./TeamInfo";
import { addFollowPlayer, addFollowTeam } from "@/app/redux/features/userSlice";
import Loading from "@/app/Loading";

const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;

const DetailTeamPage = () => {
  const [isFollow, setIsFollow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [teamId, setTeamId] = useState("");
  const [season, setSeason] = useState(2023);
  // const [seasonData, setSeasonData] = useState(new Date().getFullYear());
  const dispatch = useDispatch();

  const teamData = useSelector((state: any) => state.team.teamData);
  const searchId = teamData?.id ?? 120;
  const logoPath = selectLogo(searchId);
  const twitterPath = selectTwitter(searchId);
  const teamPath = selectTeam(searchId) ?? "";

  const followCheck = useSelector(
    (state: any) => state.user.followList?.TeamList
  );

  useEffect(() => {
    const parsing = window.location.href.split("teams/")[1];
    setTeamId(parsing);
    dispatch(teamDetailData(parsing));
    if (followCheck && parsing) {
      followCheck.map((team: { teamId: number }) => {
        if (team.teamId === parseInt(parsing)) {
          setIsFollow(true);
        }
      });
    }
  }, [teamId]);

  const followBTN = () => {
    dispatch(addFollowTeam(teamData.id));
    setIsFollow(!isFollow);
  };

  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    if (teamData) {
      setIsLoading(false);
    }
  }, [teamId]);

  if (isLoading) {
    <Loading />
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
    setSeason(parseInt(value)); // 선택한 연도로 조회를 실행
  };

  const [scrollY, setScrollY] = useState(0);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  // 스크롤 이벤트 리스너 등록 및 해제
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 카드의 top 위치 계산
  const cardTop = 100 + scrollY; // 원하는 위치로 조절

  return (
    <>
      <div className="header">
        {/* <div className="card-container"> */}
        <div className="card2">
          {/* <div className="card" style={{ top: `${cardTop}px` }}> */}
          <div>
            {teamData && (
              <>
                <Card
                  hoverable
                  style={{ width: 240, border: "2px solid rgb(6, 31, 77)" }}
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
                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <button
                      style={{
                        backgroundColor: "rgb(6, 31, 77)",
                        color: "white",
                        padding: "3px",
                        borderRadius: "5px",
                      }}
                    >
                      <a href={twitterPath}>구단 SNS 바로가기</a>
                    </button>
                  </div>
                  <div>
                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                      {isFollow ? (
                        <Button
                          className="f_button"
                          type="primary"
                          onClick={followBTN}
                          style={{ color: "black", backgroundColor: "pink" }}
                        >
                          언팔로우
                        </Button>
                      ) : (
                        <Button
                          className="f_button"
                          type="primary"
                          onClick={followBTN}
                          style={{ color: "black", backgroundColor: "skyblue" }}
                        >
                          팔로우
                        </Button>
                      )}
                    </div>
                  </div>

                  <div style={{ padding: "10px" }}>
                    <div style={{ textAlign: "center" }}>
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
                  </div>

                  <TeamStat teamId={teamId} season={season} />
                </Card>
              </>
            )}
          </div>
        </div>
        <div className="teamImage">
          <Image src={teamPath} alt="이미지 없음" />
          <div className="roster">
            <TeamRoster teamId={teamId} season={season} />
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default DetailTeamPage;
