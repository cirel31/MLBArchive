import {useDispatch, useSelector} from "react-redux";
import {teamStatData} from "@/app/redux/features/teamSlice";
import {useEffect} from "react";

const TeamStat = (props:any) => {
  const {teamId, season} = props

  const dispatch = useDispatch()
  useEffect(() => {
    if (teamId && season) {
      const data = {
        id: teamId,
        season: season
      }
      dispatch(teamStatData(data))
    }
  }, [])

  const statData = useSelector((state:any) => state.team.teamStat)


  return (
    <>
      <div>{season} {teamId}</div>
      <div>
        {statData &&
          <div>

          </div>
        }
      </div>
    </>
  )
}

export default TeamStat