"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPlayerDetailData } from "@/app/redux/features/playerDetailSlice";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";
import "../../../styles/PlayerPage.css";
import { addFollowPlayer } from "@/app/redux/features/userSlice";
import PlayerInfo from "../[...id]/playerInfo";
import { Button, InputNumber } from "antd";

const PlayerDetailPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathURI = usePathname();
  const followCheck = useSelector(
    (state: any) => state.user.followList?.PlayerList
  );
  const [isFollow, setIsFollow] = useState(false);
  const [seasonData, setSeasonData] = useState(new Date().getFullYear());
  const playerData: any = useSelector(
    (state: any) => state.playerDetail.playerData
  );
  const playerScore: any = useSelector(
    (state: any) => state.playerDetail.playerScore
  );
  const playerId = parseInt(pathURI.slice(9));
  const MIN_YEAR: number = 1903;
  const MAX_YEAR = new Date().getFullYear();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    const searchQuery = {
      playerId: playerId,
      season: seasonData,
    };
    dispatch(fetchPlayerDetailData(searchQuery));
  }, []);
  useEffect(() => {
    if (followCheck && playerData) {
      followCheck.map((player: { playerId: number }) => {
        if (player.playerId === playerData.id) {
          setIsFollow(!isFollow);
        }
      });
    }
  }, []);

  const followBTN = () => {
    dispatch(addFollowPlayer(playerData.id));
    setIsFollow(!isFollow);
  };
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
      };
      dispatch(fetchPlayerDetailData(searchQuery));
    }
  };
  if (!isClient) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <p>{parseInt(pathURI.slice(9))}</p>
        {playerData && (
          <div>
            <div className="infoBox">
              <div className="playerImage">
                <img src={playerData.image} alt="이미지파일이없엉..." />
                <Button
                  onClick={() => dispatch(addFollowPlayer(playerData.id))}
                >
                  팔로우
                </Button>
              </div>
              <PlayerInfo playerData={playerData} />
            </div>
          </div>
        )}
        <div>
          <InputNumber
            type="number"
            min={MIN_YEAR}
            max={MAX_YEAR}
            value={seasonData}
            // onChange={(e) => setSeasonData(parseInt(e.target.value))}
            onChange={(value) => setSeasonData(value)}
          />
          <Button onClick={seasonSearchBTN}>조회</Button>
        </div>
        <div>
          {isFollow ? (
            <Button onClick={followBTN}>언팔로우</Button>
          ) : (
            <Button onClick={followBTN}>팔로우</Button>
          )}
        </div>
        <div>
          <div>타석 성적 : &nbsp;</div>
          <div>
            타석 성적
            {playerScore?.playerHitting ? (
              Object.entries(playerScore.playerHitting).map(([key, value]) => (
                <div key={key}>
                  {key} : {String(value)}
                </div>
              ))
            ) : (
              <div> 해당 시즌에는 활동한 기록이 없습니다.</div>
            )}
          </div>
        </div>

        <div>
          <div>투구 성적</div>
          {playerScore?.playerPitching ? (
            Object.entries(playerScore.playerPitching).map(([key, value]) => (
              <div key={key}>
                {key} : {String(value)}
              </div>
            ))
          ) : (
            <div>해당 시즌에는 활동한 기록이 없습니다.</div>
          )}
        </div>

        <div>
          <div>타석 성적</div>
          {playerScore?.playerHitting ? (
            Object.entries(playerScore.playerHitting).map(([key, value]) => (
              <div key={key}>
                {key} : {String(value)}
              </div>
            ))
          ) : (
            <div>해당 시즌에는 활동한 기록이 없습니다.</div>
          )}
        </div>
        <div>
          <div>수비 성적</div>
          {playerScore?.playerFielding ? (
            Object.entries(playerScore.playerFielding).map(([key, value]) => (
              <div key={key}>
                {key} : {String(value)}
              </div>
            ))
          ) : (
            <div>해당 시즌에는 활동한 기록이 없습니다.</div>
          )}
        </div>
      </>
    );
  }
};

export default PlayerDetailPage;
