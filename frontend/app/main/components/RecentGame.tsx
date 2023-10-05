"use client";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { fetchTodayMatchDataAPI } from "@/app/redux/api/rankAPI";
import game from "@/assets/game.png";
const RecentGame = () => {
  const [matchList, setMatchList] = useState([]);
  useEffect(() => {
    const response: Promise<any> = fetchTodayMatchDataAPI();
    response
      .then((response) => {
        setMatchList(response.resultData);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // ... (이전 코드 부분)

  // ... (이전 코드 부분)

  return (
    <>
      <div className="gametime">
        <div
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            fontSize: "40px",
            fontWeight: "100",
          }}
        >
          오늘의 경기
          {/* {content.matchDate.slice(0, 10)} */}
        </div>
        <div style={{ display: "flex" }}>
          {matchList && matchList.length > 0 ? (
            matchList.map((content: any) => {
              const showGame = content.awayName || content.homeName;
              return showGame ? (
                <div key={content.id}>
                  <div className="one_game2">
                    <div className="contentbox">
                      <div>
                        {" "}
                        {content.awayName} : {content.awayScore}
                      </div>
                      <div>vs</div>
                      <div>
                        {" "}
                        {content.homeName} : {content.homeScore}
                      </div>
                      <div>이닝 : {content.currentInning}</div>
                    </div>
                  </div>
                </div>
              ) : null;
            })
          ) : (
            <p style={{ color: "white" }}>오늘은 경기 일정이 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RecentGame;
