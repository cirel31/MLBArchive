'use client'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchPlayerDetailData} from "@/app/redux/features/playerDetailSlice";
import {useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";


const PlayerDetailPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathURI = usePathname()
  const [seasonData, setSeasonData] = useState(new Date().getFullYear())
  const playerData:any = useSelector((state:any) => state.playerDetail.playerData)
  const playerId = parseInt(pathURI.slice(9))
  const MIN_YEAR:number = 1903
  const MAX_YEAR = new Date().getFullYear()
  useEffect(() => {
    const searchQuery = {
      playerId: playerId,
      season: seasonData,
    }
    dispatch(fetchPlayerDetailData(searchQuery))
  }, [])

  const seasonSearchBTN = () => {
    if (MIN_YEAR > seasonData) {
      Swal.fire({
        title: "검색 오류",
        icon: "warning",
        text: "메이저리그 이전 시즌의 기록은 검색할 수 없습니다."
      })
    }
    else if (seasonData > MAX_YEAR) {
      Swal.fire({
        title: "검색 오류",
        icon: "warning",
        text: "아직 이루어지지 않은 시즌의 기록은 검색할 수 없습니다."
      })
    }
    else {
      const searchQuery = {
        playerId: playerId,
        season: seasonData,
      }
      console.log(seasonData)
      dispatch(fetchPlayerDetailData(searchQuery))
    }
  }
  const followBTN = () => {

  }

  return (
    <>
      <p>{parseInt(pathURI.slice(9))}</p>
      <div>갸아아아아아악</div>
      <div>
        <input
          style={{border: "solid black 1px"}}
          type="number"
          min={MIN_YEAR}
          max={MAX_YEAR}
          value={seasonData}
          onChange={e => setSeasonData(parseInt(e.target.value))}
        />
        <button onClick={seasonSearchBTN}>조회</button>
      </div>
      {(playerData.data.status === 204 && (
        <div>
          {playerData.data.message}
        </div>
      ))}
      {playerData.info &&
        <div>
          <div>
            {playerData.info.map((key:any, value:any) => (
              <div key={key}>{key} : {value}</div>
            ))}
          </div>
          <div>
            {playerData.hitting ? playerData.hitting.map((key:any, value:any) => (
              <div key={key}>{key} : {value}</div>
            )) : <div>해당 시즌에는 활동한 기록이 없습니다.</div>
            }
          </div>
          <div>
            {playerData.pitching ? playerData.pitching.map((key:any, value:any) => (
              <div key={key}>{key} : {value}</div>
            )) : <div>해당 시즌에는 활동한 기록이 없습니다.</div>
            }
          </div>
          <div>
            {playerData.fielding ? playerData.fielding.map((key:any, value:any) => (
              <div key={key}>{key} : {value}</div>
            )) : <div>해당 시즌에는 활동한 기록이 없습니다.</div>
            }
          </div>
        </div>
      }

    </>
  )
}

export default PlayerDetailPage