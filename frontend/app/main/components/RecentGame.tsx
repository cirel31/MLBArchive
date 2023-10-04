"use client";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { fetchTodayMatchDataAPI } from "@/app/redux/api/rankAPI";

const RecentGame = () => {
  const [matchList, setMatchList] = useState([]);
  useEffect(() => {
    const response: Promise<any> = fetchTodayMatchDataAPI();
    response
      .then((response) => {
        setMatchList(response.resultData);
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="gametime">
          {matchList && matchList.length > 0 ?
            matchList.map((content: any) => (
              <div key={content.id} className="one_game">
                <div>{content.awayName} vs {content.homeName}</div>
                <div>경기 일자 : {content.matchDate.slice(0, 10)}</div>
              </div>
            )) :
            <p>오늘은 경기 일정이 없습니다.</p>
          }
      </div>
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
