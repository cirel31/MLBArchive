import React from "react";

interface TeamInfoProps {
  activeYears: string;
}

const TeamInfo: React.FC<TeamInfoProps> = ({ activeYears }) => {
  const containerStyle: React.CSSProperties = {
    overflowY: "scroll", // 세로 스크롤만 표시
    maxHeight: "300px", // 컨테이너의 최대 높이
  };

  const splitActiveYears = (activeYears: number | undefined) => {
    // activeYears가 undefined인 경우 빈 문자열로 초기화합니다.
    const activeYearsStr = activeYears?.toString() || "";
    const regex = /.{1,4}/g; // 4글자씩 자를 정규식
    return activeYearsStr.match(regex) || []; // 정규식에 맞게 자른 결과를 배열로 반환
  };

  return (
    <div style={containerStyle}>
      {splitActiveYears(activeYears).map((segment, index) => (
        <p key={index}>{segment}</p>
      ))}
    </div>
  );
};

export default TeamInfo;
