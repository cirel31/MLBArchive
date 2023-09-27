import {useDispatch, useSelector} from "react-redux";
import {teamRosterData} from "@/app/redux/features/teamSlice";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import "@/styles/TeamRosterPlayer.scss"

const TeamRoster = (props:any) => {
  const {teamId, season} = props
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(() => {
    if (teamId && season) {
      const data = {
        id: teamId,
        season: season
      }
      console.log(data)
      dispatch(teamRosterData(data))
    }
  }, [season])

  const rosterData = useSelector((state:any) => state.team.teamRoster)
  // 행 개수
  const slideSize = 3


  return (
    <>
      {console.log(rosterData)}
      <div>{season} 로스터</div>
      <div className="boxTemplate">
        {rosterData &&
          <div className="rosterContainer">
            {Array(Math.ceil(rosterData.length / slideSize)).fill(0).map((_, index:number) => (
              <div className="slide" key={index}>
                {rosterData.slice(index * slideSize, (index + 1) * slideSize).map((player:any) => (
                  <div
                    className="playerNameContainer"
                    key={player.playerId}
                    onClick={() => router.push(`/players/${player.playerId}`)}>
                    <p>{player.playerName}</p>
                    <img src={player.image} alt="이미지" className="playerImage"/>
                  </div>
                ))}
              </div>
            ))}
          </div>
        }
      </div>
    </>
  )
}

export default TeamRoster