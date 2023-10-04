"use client";
import { useState } from "react";
import "../../styles/SearchPageStyle.scss";
import SearchMatch from "@/app/search/SearchMatch";
import SearchPlayer from "@/app/search/SearchPlayer";
import { useDispatch } from "react-redux";
import { reSetData } from "@/app/redux/features/searchPlayerSlice";
import { Tabs } from "antd";

const SearchPage: React.FC = () => {
  const dispatch = useDispatch();
  const [match, setMatch] = useState(true);
  const [player, setPlayer] = useState(false);
  const [activeKey, setActiveKey] = useState("match");

  const handleTabClick = (key:any) => {
    setActiveKey(key); // 클릭한 탭을 활성화된 탭으로 설정합니다.
  };

  // 경기 검색과 선수 검색을 선택할 때 사용하는 함수
  const SearchKind = (kind: string) => {
    if (kind === "match") {
      setMatch(true);
      setPlayer(false);
    } else if (kind === "player") {
      setMatch(false);
      setPlayer(true);
    }
  };

  // 탭 변경 시 호출되는 함수
  const onChange = (kind: string) => {
    if (kind === "match") {
      setMatch(true);
      setPlayer(false);
    } else if (kind === "player") {
      setMatch(false);
      setPlayer(true);
    }
  };

  const tabPaneStyle = {
    border: "2px solid rgb(6, 31, 77)", // 테두리 스타일을 변경합니다.
    padding: "16px",
    borderRadius: "10px",
  };

  return (
    <>
      {/* 탭 컴포넌트 */}
      <Tabs
        className="tab"
        onChange={onChange}
        type="card"
        style={tabPaneStyle}
        items={[
          {
            label: "경기 검색", // 첫 번째 탭에 "경기 검색" 라벨 추가
            key: "match",
            children: match && <SearchMatch />, // 해당 탭에 경기 검색 컴포넌트를 표시
          },
          {
            label: "선수 검색", // 두 번째 탭에 "선수 검색" 라벨 추가
            key: "player",
            children: player && <SearchPlayer />, // 해당 탭에 선수 검색 컴포넌트를 표시
          },
        ]}
      />
    </>
  );
};

export default SearchPage;
