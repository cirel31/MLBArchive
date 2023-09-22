"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPlayerDetailData } from "@/app/redux/features/playerDetailSlice";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";
import "../../../styles/PlayerPage.css";
import {addFollowPlayer} from "@/app/redux/features/userSlice";

const PlayerDetailPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathURI = usePathname()
  const [seasonData, setSeasonData] = useState(new Date().getFullYear())
  const playerData: any = useSelector((state:any) => state.playerDetail.playerData)
  const playerScore: any = useSelector((state: any) => state.playerDetail.playerScore)
  const playerId = parseInt(pathURI.slice(9))
  const MIN_YEAR:number = 1903
  const MAX_YEAR = new Date().getFullYear()
  useEffect(() => {
    const searchQuery = {
      playerId: playerId,
      season: seasonData,
    };
    dispatch(fetchPlayerDetailData(searchQuery));
  }, []);

  const seasonSearchBTN = () => {
    if (MIN_YEAR > seasonData) {
      Swal.fire({
        title: "검색 오류",
        icon: "warning",
        text: "메이저리그 이전 시즌의 기록은 검색할 수 없습니다.",
      });
    } else if (seasonData > MAX_YEAR) {
      Swal.fire({
        title: "검색 오류",
        icon: "warning",
        text: "아직 이루어지지 않은 시즌의 기록은 검색할 수 없습니다.",
      });
    } else {
      const searchQuery = {
        playerId: playerId,
        season: seasonData,
      }
      dispatch(fetchPlayerDetailData(searchQuery))
    }
  };
  const followBTN = () => {};

  return (
    <>
      <p>{parseInt(pathURI.slice(9))}</p>
      <div>
        <input
          className="bg-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
          type="text"
          placeholder="검색어를 입력하세요..."
        />
      </div>
      <div>
        <input
          style={{ border: "solid black 1px" }}
          type="number"
          min={MIN_YEAR}
          max={MAX_YEAR}
          value={seasonData}
          onChange={(e) => setSeasonData(parseInt(e.target.value))}
        />
        <button onClick={seasonSearchBTN}>조회</button>
      </div>
      {playerData &&
        <div>
          <div>
            <button onClick={() => dispatch(addFollowPlayer(playerData.id))}>팔로우</button>
          </div>
          <div>
            {playerData.backnumber}
          </div>
          <div>
            {playerData.debutDate}
          </div>
          <div>
            {playerData.retireDate}
          </div>
          <div>
            {playerData.height}
          </div>
          <div>
            {playerData.weight}
          </div>
          <div>
            {playerData.name}
          </div>
          <div>
            {playerData.mainPosition}
          </div>
          <div>
            {playerData.playing}
          </div>

          <div>
            <img src={playerData.image} alt="이미지파일이없엉..."/>
          </div>
          <div>
            {playerData.mainHand}
          </div>
        </div>
      }

      <div>
        <div>
          타석 성적
        </div>
        {playerScore?.playerHitting ? Object.entries(playerScore.playerHitting).map(([key, value]) => (
          <div key={key}>{key} : {String(value)}</div>
        )) : <div>해당 시즌에는 활동한 기록이 없습니다.</div>
        }
      </div>
      <div>
        <div>
          투구 성적
        </div>
        {playerScore?.playerPitching ? Object.entries(playerScore.playerPitching).map(([key, value]) => (
          <div key={key}>{key} : {String(value)}</div>
        )) : <div>해당 시즌에는 활동한 기록이 없습니다.</div>
        }
      </div>
      <div>
        <div>
          수비 성적
        </div>
        {playerScore?.playerFielding ? Object.entries(playerScore.playerFielding).map(([key, value]) => (
          <div key={key}>{key} : {String(value)}</div>
        )) : <div>해당 시즌에는 활동한 기록이 없습니다.</div>
        }
      </div>
      <div>
        테스트 중
      </div>
    </>
  );
};

export default PlayerDetailPage;