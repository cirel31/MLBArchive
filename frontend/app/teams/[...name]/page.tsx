"use client";
import { useEffect, useState } from "react";
import "../../../styles/TeamPage.css";
import {useSelector} from "react-redux";
import Image from "next/image";
import {selectLogo, selectTwitter} from "@/app/components/team/teamData";

const DetailTeamPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const teamDetailData = useSelector((state:any) => state.team.teamData)
  const searchId = teamDetailData?.id ?? 120
  const logoPath = selectLogo(searchId)
  const twitterPath = selectTwitter(searchId)
  useEffect(() => {
    if (teamDetailData) {
      setIsLoading(false)
    }
  })
  if (isLoading) {
    console.log("로딩 중...")
    // return (
    //   <>
    //     <div>로딩 중...</div>
    //   </>
    // )
  }
  return (
    <>
      <div className="container">
        <div className="item1">
          <p>팀로고</p>
          <Image src={logoPath} alt="이미지 없음" />
        </div>
        <div className="item2">
          <p>아무거나 팀 이미지 하나씩 넣기</p>
          <p> 팀 트위터 넣고 싶음</p>
          <a href={twitterPath}>트위터 넣어 줌</a>
        </div>
        <div className="item3">
          <p>팀관련기사</p>
        </div>
      </div>
    </>
  );
};

export default DetailTeamPage;
