import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestDetailMatchData,
  requestMatchData,
} from "@/app/redux/features/matchSlice";
import { teamData } from "@/app/components/team/teamData";
import { useRouter } from "next/navigation";
import { fetchPlayerWordData } from "@/app/redux/features/searchPlayerSlice";
import { Button } from "antd";
import { Helmet } from "react-helmet";
import MatchTable from "./MatchTable";

const SearchMatch = () => {
  const dispatch = useDispatch();
  const teamList = teamData;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [teamName, setTeamName] = useState("109");
  const [nowPage, setNowPage] = useState(0);
  const matchList = useSelector((state: any) => state.match?.matchData);
  const totalPage = useSelector((state: any) => state.searchPlayer.totalPage);

  const router = useRouter();
  function formatDate(date: Date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  const SearchMach = () => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    setNowPage(0);
    const action = {
      teamName: teamName,
      start: formattedStartDate,
      end: formattedEndDate,
      nowPage: 0,
      articlePerPage: 30,
    };
    console.log(action);
    dispatch(requestMatchData(action));
  };
  const searchQuery = (x: number) => {
    let idx = 0;
    if (x === 0 || nowPage + x < 0) {
      setNowPage(0);
    } else if (nowPage + x >= totalPage || x === totalPage) {
      idx = totalPage - 1;
      setNowPage(idx);
    } else {
      idx = nowPage + x;
      setNowPage(idx);
    }
    const action = {
      searchData: teamName,
      nowPage: nowPage,
      articlePerPage: 30,
    };
    dispatch(fetchPlayerWordData(action));
  };
  const searchDetailMatch = (id: string) => {
    console.log("로직 실행 확인 중", id);
    dispatch(requestDetailMatchData(id));
    router.push(`/match/${id}`);
  };
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </Helmet>
      <div className="searchgame">
        <div className="playsearching">
          <p className="title">어떤 경기 결과를 검색하고 싶으신가요?</p>
          <div className="teambox2">
            <div className="teambox1">
              <div className="name">팀 이름</div>
              <select
                className="selectbox1"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              >
                {teamList.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="teambox2">
            <div className="teambox1">
              <div className="name">시작날짜</div>
              <DatePicker
                className="selectbox1"
                dateFormat="yyyy.MM.dd"
                shouldCloseOnSelect
                minDate={new Date("1900-01-01")}
                maxDate={new Date()}
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
              />
            </div>
          </div>
          <div className="teambox2">
            <div className="teambox1">
              <div className="name">종료날짜</div>
              <DatePicker
                className="selectbox1"
                dateFormat="yyyy.MM.dd"
                shouldCloseOnSelect
                minDate={startDate}
                maxDate={new Date()}
                selected={endDate}
                onChange={(date: Date) => setEndDate(date)}
              />
            </div>
          </div>
          <Button onClick={SearchMach}>검색</Button>
        </div>

        <div className="searchresult">
          {matchList ? (
            <div>
              {/* 하위 컴포넌트에 데이터와 콜백 함수를 전달 */}
              <MatchTable
                matchList={matchList}
                searchDetailMatch={searchDetailMatch}
              />
            </div>
          ) : (
            <div>결과가 없습니다.</div>
          )}
        </div>
      </div>
      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => searchQuery(0)}>
          {" "}
          <span className="material-symbols-outlined">
            keyboard_double_arrow_left
          </span>
        </button>
        <br />
        <br />
        <button onClick={() => searchQuery(-1)}>
          {" "}
          <span className="material-symbols-outlined">keyboard_backspace</span>
        </button>
        <br />
        <br />
        <button onClick={() => searchQuery(+1)}>
          {" "}
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </button>
        <br />
        <br />
        <button onClick={() => searchQuery(totalPage)}>
          {" "}
          <span className="material-symbols-outlined">
            keyboard_double_arrow_right
          </span>
        </button>
      </div> */}
    </>
  );
};

export default SearchMatch;
