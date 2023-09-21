"use client";
import { useEffect, useState } from "react";
import "../../../styles/TeamPage.css";

const DetailTeamPage = () => {
  const [teamName, setTeamName] = useState("");
  useEffect(() => {
    const parsing = window.location.href.split("teams/")[1];
    setTeamName(parsing);
  }, []);

  return (
    <>
      <div className="container">
        <div className="item1">
          <p>팀로고</p>
        </div>
        <div className="item2">
          <h1>{teamName}</h1>
          <p>아무거나 팀 이미지 하나씩 넣기</p>
          <p> 팀 트위터 넣고 싶음</p>
        </div>
        <div className="item3">
          <p>팀관련기사</p>
        </div>
      </div>
    </>
  );
};

export default DetailTeamPage;
