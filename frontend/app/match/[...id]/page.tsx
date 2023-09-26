"use client"
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

const MatchPage = () => {
  const router = useRouter()
  const matchData = useSelector((state:any) => state.match.matchDetailData)
  console.log(matchData)
  useEffect(() => {
    if (!matchData) {
      router.push(`/search`)
    }
  }, [matchData])

  return (
    <>
      {matchData &&
        <div>
          <div>
            <div>어웨이 팀</div>
            <div>id : {matchData.awayId}</div>
            <div>이름 : {matchData.awayName}</div>
            <div>점수 : {matchData.awayScore}</div>
            <div>선발 투수 : {matchData.awayPitcher}</div>
          </div>
          <div>
            <div>홈 팀</div>
            <div>id : {matchData.homeId}</div>
            <div>이름 : {matchData.homeName}</div>
            <div>점수 : {matchData.homeScore}</div>
            <div>선발 투수 : {matchData.homePitcher}</div>
          </div>
        </div>
      }
    </>
  )
}

export default MatchPage