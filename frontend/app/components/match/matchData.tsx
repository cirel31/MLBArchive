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

  const [awayHitterArray, setAwayHitterArray] = useState<any[]>([])
  const [awayPitcherArray, setAwayPitcherArray] = useState<any[]>([])
  const [homeHitterArray, setHomeHitterArray] = useState<any[]>([])
  const [homePitcherArray, setHomePitcherArray] = useState<any[]>([])

  const matchData = useSelector((state:any) => state.match.matchDetailData)
  const awayBattings = useSelector((state:any) => state.match.matchDetailData.boxscore.teams.away.battingOrder)
  const awayPitchers = useSelector((state:any) => state.match.matchDetailData.boxscore.teams.away.pitchers)
  const homeBattings = useSelector((state:any) => state.match.matchDetailData.boxscore.teams.home.battingOrder)
  const homePitchers = useSelector((state:any) => state.match.matchDetailData.boxscore.teams.home.pitchers)

  useEffect(() => {
    const awayPlayerList = matchData?.boxscore.teams.away.players;
    const homePlayerList = matchData?.boxscore.teams.home.players;

    if (awayPlayerList && homePlayerList) {
      const awayPlayers = Object.values(awayPlayerList);
      const homePlayers = Object.values(homePlayerList);
      setAwayPlayerArray(Object.values(awayPlayerList));
      setHomePlayerArray(Object.values(homePlayerList));
      console.log(matchData);

      const awayBattingPlayers = awayPlayers.filter((player: any) =>
        awayBattings.includes(player.person.id)
      );
      const awayPitchingPlayers = awayPlayers.filter((player: any) =>
        awayPitchers.includes(player.person.id)
      );
      const homeBattingPlayers = homePlayers.filter((player: any) =>
        homeBattings.includes(player.person.id)
      );
      const homePitchingPlayers = homePlayers.filter((player: any) =>
        homePitchers.includes(player.person.id)
      );
      console.log("중간결과");
      console.log(awayBattingPlayers);
      console.log(awayPitchingPlayers);
      console.log(homeBattingPlayers);
      console.log(homePitchingPlayers);

      setAwayHitterArray(awayBattingPlayers);
      setAwayPitcherArray(awayPitchingPlayers);
      setHomeHitterArray(homeBattingPlayers);
      setHomePitcherArray(homePitchingPlayers);
    }
  }, [matchData]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <button
            className="modal-close-button"
            onClick={() => setIsModalOpen(false)}
          >
            닫기
          </button>
        </div>
      )}

      {matchData && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="match_team1">
            <div>AWAY TEAM</div>
            <div className="team_name_match">
              {matchData.boxscore.teams.away.team.name}
            </div>
          </div>

          <div className="match_team1">
            <div>HOME TEAM</div>
            <div className="team_name_match">
              {matchData.boxscore.teams.home.team.name}
            </div>
          </div>
        </div>
      )}
      <div className="modalbutton">
        <button onClick={() => setIsModalOpen(!isModalOpen)}>선수 확인</button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <div>
              <div style={{ fontWeight: "bolder", textAlign: "center" }}>
                AWAY TEAM 타자
              </div>
              <div>
                {awayHitterArray.map((player: any) => (
                  <div
                    key={player.person.id}
                    onClick={() => router.push(`/players/${player.person.id}`)}
                    style={{ cursor: "pointer" }}
                    className="onebox"
                  >
                    <div>{player.person.fullName}</div>
                    <div>POSITION: {player.position.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontWeight: "bolder", textAlign: "center" }}>
                AWAY TEAM 투수
              </div>
              <div>
                {awayPitcherArray.map((player: any) => (
                  <div
                    key={player.person.id}
                    onClick={() => router.push(`/players/${player.person.id}`)}
                    style={{ cursor: "pointer" }}
                    className="onebox"
                  >
                    <div>{player.person.fullName}</div>
                    <div>POSITION: {player.position.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontWeight: "bolder", textAlign: "center" }}>
                HOME TEAM 타자
              </div>
              <div>
                {homeHitterArray.map((player: any) => (
                  <div
                    key={player.person.id}
                    onClick={() => router.push(`/players/${player.person.id}`)}
                    style={{ cursor: "pointer" }}
                    className="onebox"
                  >
                    <div>{player.person.fullName}</div>
                    <div>POSITION: {player.position.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontWeight: "bolder", textAlign: "center" }}>
                HOME TEAM 투수
              </div>
              <div>
                {homePitcherArray.map((player: any) => (
                  <div
                    key={player.person.id}
                    onClick={() => router.push(`/players/${player.person.id}`)}
                    style={{ cursor: "pointer" }}
                    className="onebox"
                  >
                    <div>{player.person.fullName}</div>
                    <div>POSITION: {player.position.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="modal-close-button"
              onClick={() => setIsModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MatchData;
