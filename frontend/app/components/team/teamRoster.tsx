import {useDispatch, useSelector} from "react-redux";
import {teamRosterData} from "@/app/redux/features/teamSlice";
import {useEffect} from "react";

const TeamRoster = (props:any) => {
  const {teamId, season} = props

  const dispatch = useDispatch()
  useEffect(() => {
    const data = {
      id: teamId,
      season: season
    }
    console.log(data)
    dispatch(teamRosterData(data))
  })

  const rosterData = useSelector((state:any) => state.team.teamRoster)


  return (
    <>
      <div>{season} {teamId}</div>
      <div>
        {rosterData &&
          <div>

          </div>
        }
      </div>
    </>
  )
}

export default TeamRoster