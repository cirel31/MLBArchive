"use client";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { fetchTodayMatchDataAPI } from "@/app/redux/api/rankAPI";

const RecentGame = () => {
  const [matchList, setMatchList] = useState([]);
  useEffect(() => {
    const response: Promise<AxiosResponse> = fetchTodayMatchDataAPI();
    response
      .then((response) => {
        setMatchList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {/* <div className="gametime">
        경기일정
        <div>
          {matchList.length > 0 ?
            matchList.map((content: any) => (
              <div key={content.id}>
                {content.name}
              </div>
            )) :
            <p>오늘은 경기 일정이 없습니다.</p>
          }
        </div>
      </div> */}
      <div className="gametime">
        <div className="one_game">게임없음</div>
        <div className="one_game">게임없음</div>
        <div className="one_game">게임없음</div>
        <div className="one_game">게임없음</div>
      </div>
    </>
  );
};

export default RecentGame;
