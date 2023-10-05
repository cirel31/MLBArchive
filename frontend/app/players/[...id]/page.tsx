"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayerDetailData } from "@/app/redux/features/playerDetailSlice";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";
import "../../../styles/PlayerPage.css";
import { addFollowPlayer } from "@/app/redux/features/userSlice";
import PlayerInfo from "../[...id]/playerInfo";
import {Button, InputNumber, Divider, Typography, Modal} from "antd";
import Loading from "@/app/Loading";
import FieldingTable from "./PlayerFieldingData";
import HittingTable from "./PlayerHittingData";
import PitchingTable from "./PlayerPitchingData ";
import {teamData} from "@/app/components/team/teamData";
import {comparisonAPI} from "@/app/redux/api/playerAPI";
import ArizonaDiamondbacks from "@/assets/teamlogo/ArizonaDiamondbacks.svg";
import ADphoto from "@/assets/teamphoto/ADphoto.jpg";

const { Title } = Typography;

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
  const [isLoading, setIsLoading] = useState(true); // 처음 접속 시 로딩 상태 활성화

  useEffect(() => {
    const searchQuery = {
      playerId: playerId,
      season: seasonData,
    };
    dispatch(fetchPlayerDetailData(searchQuery));

    // 처음 접속 시에만 로딩 상태를 비활성화
    setIsLoading(false);
  }, [playerId, seasonData]);

  useEffect(() => {
    if (followCheck && playerData) {
      followCheck.map((player: { playerId: number }) => {
        if (player.playerId === playerData.id) {
          setIsFollow(true);
        }
      });
    }
  }, [followCheck, playerData]);

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

  const [isModal, setIsModal] = useState(false)
  const [teamName, setTeamName] = useState('')
  const [comparisonName, setComparisonName] = useState('')
  const [comparisonSeason, setComparisonSeason] = useState(2023)
  const [exceptionModal1, setExceptionModal1] = useState(false)
  const [exceptionModal1Message, setExceptionModal1Message] = useState('')

  const [exceptionModal2, setExceptionModal2] = useState(false)

  const defaultTeam = [
    {
    id: '',
    name: '',
    linkName: '',
    logo: '',
    rotationX: 0,
    rotationY: 0,
    twitter: '',
    team: '',
  },
  ]
  const teamList = [...defaultTeam, ...teamData]
  const onModal = () => {
    setIsModal(true)
  }
  const comparisonSearch = (player1Id:number, player2Name:string, player2Team:string, player2Season:number) => {
    console.log("확인", player1Id, player2Name, player2Team, player2Season)
    const response = comparisonAPI(player1Id, player2Name, player2Team, player2Season)
    response.then((response:any) => {
      console.log(response)
      if (response.status === 204) {
        setExceptionModal1(true)
        setExceptionModal1Message(response.message)
      }
    })

  }
  const resetModal = () => {
    setTeamName('')
    setExceptionModal1(false)
    setComparisonName('')
    setComparisonSeason(2023)
    setExceptionModal1Message('')
    setExceptionModal2(false)
    setIsModal(false)
  }
  return (
    <div className="container2">
      {/* 처음 접속 시에만 로딩 창을 표시합니다 */}
      {isLoading && (
        <div className="loading">
          <Loading />
        </div>
      )}

      {playerData && (
        <div>
          <div className="infoBox">
            <div className="playerImage2">
              <div className="photo_box">
                <Title>{playerData.name}</Title>
                <img
                  style={{ margin: "0 auto" }}
                  src={playerData.image}
                  alt="이미지파일이없엉..."
                />
                <div>
                  {isFollow ? (
                    <Button
                      className="f_button"
                      type="primary"
                      onClick={followBTN}
                      style={{ color: "black", backgroundColor: "pink" }}
                    >
                      언팔로우
                    </Button>
                  ) : (
                    <Button
                      className="f_button"
                      type="primary"
                      onClick={followBTN}
                      style={{ color: "black", backgroundColor: "skyblue" }}
                    >
                      팔로우
                    </Button>
                  )}
                </div>
              </div>

              <div className="scoreView">
                <div className="year">
                  <InputNumber
                    type="number"
                    min={MIN_YEAR}
                    max={MAX_YEAR}
                    value={seasonData}
                    onChange={(value) => setSeasonData(value ?? seasonData)}
                  />
                  <Button onClick={seasonSearchBTN}>조회</Button>
                </div>
                <div>
                  <div className="num">투구 성적</div>
                  <div>
                    <PitchingTable playerScore={playerScore} />
                  </div>
                </div>
                <Divider />
                <div>
                  <div className="num">타석 성적</div>
                  <div>
                    <HittingTable playerScore={playerScore} />
                  </div>
                </div>
                <Divider />
                <div>
                  <div className="num">수비 성적</div>
                  <div>
                    <FieldingTable playerScore={playerScore} />
                  </div>
                </div>
              </div>
            </div>
            <PlayerInfo playerData={playerData} />
          </div>
          <div onClick={onModal}>선수 비교</div>
        </div>
      )}
      <Modal
        title="비교할 선수를 검색해주세요!"
        open={isModal}
        onOk={() => comparisonSearch(playerId, comparisonName, teamName, comparisonSeason)}
        onCancel={() => resetModal()}
      >
        <div>
          <label>선수 이름</label>
          <input
            type="text"
            value={comparisonName}
            onChange={(e) => setComparisonName(e.target.value)}
          />
        </div>
        <div>
          <div>
            <label>팀 이름</label>
            <select
              className="selectbox1"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            >
              {teamList.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label>시즌</label>
          <input
            type="number"
            value={comparisonSeason}
            onChange={(e) => setComparisonSeason(parseInt(e.target.value))}
          />
        </div>
        <p>결과 관련 에러문 이 아래에 뜰거임ㅇㅇ</p>
        {exceptionModal1 && (
          <div>{exceptionModal1Message}</div>
        )}
      </Modal>
    </div>
  );
};

export default PlayerDetailPage;
