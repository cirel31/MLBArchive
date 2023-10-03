import { useDispatch, useSelector } from "react-redux";
import { teamRosterData } from "@/app/redux/features/teamSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/styles/TeamRosterPlayer.scss";

const TeamRoster = (props: any) => {
  const { teamId, season } = props;
  console.log(season)
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (teamId && season) {
      const data = {
        id: teamId,
        season: season,
      };
      console.log(data);
      dispatch(teamRosterData(data));
    }
  }, [teamId, season]);

  const rosterData = useSelector((state: any) => state.team.teamRoster);
  const columns = 5;

  return (
    <>
      <div className="roster">{season} ROSTER</div>
      <div className="boxTemplate">
        {rosterData && (
          <div className="rosterContainer">
            {Array(Math.ceil(rosterData.length / columns))
              .fill(0)
              .map((_, columnIndex: number) => (
                <div className="column" key={columnIndex}>
                  {rosterData
                    .slice(
                      columnIndex * Math.ceil(rosterData.length / columns),
                      (columnIndex + 1) * Math.ceil(rosterData.length / columns)
                    )
                    .map((player: any) => (
                      <div
                        className="playerNameContainer"
                        key={player.playerId}
                        onClick={() =>
                          router.push(`/players/${player.playerId}`)
                        }
                      >
                        <div className="miniCard">
                          <img
                            src={player.image}
                            alt="이미지"
                            className="playerImage"
                            style={{
                              width: "60%",
                              height: "60%",
                              margin: "0 auto",
                            }}
                          />
                          <div className="name">
                            {" "}
                            <p>{player.playerName}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TeamRoster;
