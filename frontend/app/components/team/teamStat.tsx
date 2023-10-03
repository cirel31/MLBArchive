import { useDispatch, useSelector } from "react-redux";
import { teamStatData } from "@/app/redux/features/teamSlice";
import { useEffect } from "react";

const TeamStat = (props: any) => {
  const { teamId, season } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (teamId && season) {
      const data = {
        id: teamId,
        season: season,
      };
      dispatch(teamStatData(data));
    }
  }, [teamId, season]);

  const statData = useSelector((state: any) => state.team.teamStat);

  return (
    <>
      <div>
        {statData && (
          <div>
            <div>시즌 : {statData.season !== -1 ? statData.season : "-"}</div>
            <div>승 : {statData.win !== -1 ? statData.win : "-"}</div>
            <div>
              승률 :{" "}
              {statData.winPercentage !== -1 ? statData.winPercentage : "-"}
            </div>
            <div>패 : {statData.lose !== -1 ? statData.lose : "-"}</div>
            <div>무승부 : {statData.draw !== -1 ? statData.draw : "-"}</div>
            <div>
              타율 : {statData.battingAvg !== -1 ? statData.battingAvg : "-"}
            </div>
            <div>
              평균 자책점 : {statData.eraAvg !== -1 ? statData.eraAvg : "-"}
            </div>
            {statData.season >= 1969 && (
              <>
                <div>
                  지역 순위 :{" "}
                  {statData.divisionRank !== -1 ? statData.divisionRank : "-"}
                </div>
                <div>
                  리그 순위 :{" "}
                  {statData.leagueRank !== -1 ? statData.leagueRank : "-"}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TeamStat;
