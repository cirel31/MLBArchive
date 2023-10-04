"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "@/styles/MatchData.css";

const MatchData = () => {
  const router = useRouter();
  const [awayPlayerArray, setAwayPlayerArray] = useState([]);
  const [homePlayerArray, setHomePlayerArray] = useState([]);

  const [showAwayTeam, setShowAwayTeam] = useState(false);
  const [showHomeTeam, setShowHomeTeam] = useState(false);

  const matchData = useSelector((state: any) => state.match.matchDetailData);
  useEffect(() => {
    const awayPlayerList = matchData?.boxscore.teams.away.players;
    const homePlayerList = matchData?.boxscore.teams.home.players;

    if (awayPlayerList && homePlayerList) {
      setAwayPlayerArray(Object.values(awayPlayerList));
      setHomePlayerArray(Object.values(homePlayerList));
    }
  }, [matchData]);

  return (
    <>
      {matchData && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="match_team1">
            <div>AWAY TEAM</div>
            {/* <div>팀 id : {matchData.boxscore.teams.away.team.name}</div> */}
            <div className="team_name_match">
              {matchData.boxscore.teams.away.team.name}
            </div>
            {/*<div>점수 : {matchData.awayScore}</div>*/}
            {/*<div>선발 투수 : {matchData.awayPitcher}</div>*/}
            <button onClick={() => setShowAwayTeam(true)}>선수 확인</button>
            {showAwayTeam && (
              <div>
                <button onClick={() => setShowAwayTeam(false)}>
                  선수 숨기기
                </button>
                <div>
                  {awayPlayerArray.map((player: any) => (
                    <div key={player.person.id} className="playerinfo_match">
                      <div>이름 : {player.person.fullName}</div>
                      <div>코드 : {player.position.code}</div>
                      <div>포지션 이름 : {player.position.name}</div>
                      <div>포지션 타입 : {player.position.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="match_team2">
            <div>HOME TEAM</div>
            {/* <div>팀 id : {matchData.boxscore.teams.home.team.id}</div> */}
            <div className="team_name_match">
              {matchData.boxscore.teams.home.team.name}
            </div>
            {/*<div>점수 : {matchData.awayScore}</div>*/}
            {/*<div>선발 투수 : {matchData.awayPitcher}</div>*/}
            <button onClick={() => setShowHomeTeam(true)}>선수 확인</button>
            {showHomeTeam && (
              <div>
                <button onClick={() => setShowHomeTeam(false)}>
                  선수 숨기기
                </button>
                <div>
                  {homePlayerArray.map((player: any) => (
                    <div key={player.person.id} className="playerinfo_match">
                      <div>이름 : {player.person.fullName}</div>
                      <div>코드 : {player.position.code}</div>
                      <div>포지션 이름 : {player.position.name}</div>
                      <div>포지션 타입 : {player.position.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MatchData;
