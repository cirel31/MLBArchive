"use client"
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

const MatchLineScore = () => {
  const gameData = useSelector((state:any) => state.match.matchLineScore)
  const lineScore = useSelector((state:any) => state.match.matchLineScore?.linescore)
  const [awayScore, setAwayScore] = useState(0)
  const [homeScore, setHomeScore] = useState(0)
  const [innings, setInnings] = useState([])

  useEffect(() => {
    if (lineScore) {
      setInnings(Object.values(lineScore.innings))
      Object.values(lineScore.innings).map((inning:any, index) => {
        setAwayScore((prevValue) => prevValue + inning.away.runs)
        setHomeScore((prevValue) => prevValue + inning.home.runs)
      })
      console.log(awayScore, homeScore)
    }
  }, [lineScore])

  return (
    <>
      {gameData &&
        <div>
          <div>경기일 : {gameData.game_date}</div>
          <div>전체 이닝 : {lineScore.currentInning}</div>
          <div>점수 : {awayScore} vs {homeScore} </div>
          <br/>
          <div>
            {(innings.length > 1) && innings.map((inning:any, index) => (
              <div key={index}>
                <hr/>
                <div>{index + 1} 이닝</div>
                <br/>
                <div>어웨이 팀 득점 : {inning.away.runs}</div>
                <div>홈 팀 득점 : {inning.home.runs}</div>
                <br/>
                <div>어웨이 팀 안타 : {inning.away.hits}</div>
                <div>홈 팀 안타 : {inning.home.hits}</div>
                <br/>
                <div>어웨이 팀 에러 : {inning.away.errors}</div>
                <div>홈 팀 에러 : {inning.home.errors}</div>
              </div>
            ))}
            {/*  <div>Defense</div>*/}
            {/*  <div>Team : {lineScore.defense?.team.name}</div>*/}
            {/*  <div>Batter : {lineScore.defense?.batter?.fullName}</div>*/}
            {/*  <div>Catcher : {lineScore.defense?.catcher?.fullName}</div>*/}
            {/*  <div>Center : {lineScore.defense?.center?.fullName}</div>*/}
            {/*  <div>First : {lineScore.defense?.first?.fullName}</div>*/}
            {/*  <div>InHole : {lineScore.defense?.inHole?.fullName}</div>*/}
            {/*  <div>Left : {lineScore.defense?.left?.fullName}</div>*/}
            {/*  <div>OnDeck : {lineScore.defense?.onDeck?.fullName}</div>*/}
            {/*  <div>Pitcher : {lineScore.defense?.pitcher?.fullName}</div>*/}
            {/*  <div>Right : {lineScore.defense?.right?.fullName}</div>*/}
            {/*  <div>Second : {lineScore.defense?.second?.fullName}</div>*/}
            {/*  <div>ShortStop : {lineScore.defense?.shortstop?.fullName}</div>*/}
            {/*  <div>Third : {lineScore.defense?.third?.fullName}</div>*/}

            {/*  <hr/><br/><hr/>*/}

            {/*  <div>Offense</div>*/}
            {/*  <div>Team : {lineScore.offense?.team.name}</div>*/}
            {/*  <div>Batter : {lineScore.offense?.batter?.fullName}</div>*/}
            {/*  <div>Catcher : {lineScore.offense?.catcher?.fullName}</div>*/}
            {/*  <div>Center : {lineScore.offense?.center?.fullName}</div>*/}
            {/*  <div>First : {lineScore.offense?.first?.fullName}</div>*/}
            {/*  <div>InHole : {lineScore.offense?.inHole?.fullName}</div>*/}
            {/*  <div>Left : {lineScore.offense?.left?.fullName}</div>*/}
            {/*  <div>OnDeck : {lineScore.offense?.onDeck?.fullName}</div>*/}
            {/*  <div>Pitcher : {lineScore.offense?.pitcher?.fullName}</div>*/}
            {/*  <div>Right : {lineScore.offense?.right?.fullName}</div>*/}
            {/*  <div>Second : {lineScore.offense?.second?.fullName}</div>*/}
            {/*  <div>ShortStop : {lineScore.offense?.shortstop?.fullName}</div>*/}
            {/*  <div>Third : {lineScore.offense?.third?.fullName}</div>*/}
          </div>
        </div>
      }
    </>
  )
}

export default MatchLineScore