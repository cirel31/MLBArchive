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
  const [pitchers, setPichters] = useState([])
  const [hitters, setHitters] = useState([])
  const [twoways, setTwoways] = useState([])

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
      if (response.status === 200) {
        setHitters(response.resultData.others)
        setPichters(response.resultData.pitchers)
        setTwoways(response.resultData.twoWays)
      }
    })

  }
  const resetModal = () => {
    setTeamName('')
    setExceptionModal1(false)
    setComparisonName('')
    setComparisonSeason(2023)
    setExceptionModal1Message('')
    setIsModal(false)
    setPichters([])
    setTwoways([])
    setHitters([])
  }
  const resetModal2 = () => {
    setWhatName('')
    setWhatImage('')
    setEra(0)
    setWhip(0)
    setBattingAvg(0)
    setOps(0)
    setExceptionModal2(false)
  }

  const [battingAvg, setBattingAvg] = useState(0)
  const [ops, setOps] = useState(0)
  const [whip, setWhip] = useState(0)
  const [era, setEra] = useState(0)
  const [whatName, setWhatName] = useState('')
  const [whatImage, setWhatImage] = useState('')

  const comparisonHitter = (korName:string, image:string, battingAvg:number, ops:number) => {
    setWhatName(korName)
    setWhatImage(image)
    setBattingAvg(battingAvg)
    setOps(ops)
    setExceptionModal2(true)
  }
  const comparisonPitcher = (korName:string, image:string, era:number, whip:number) => {
    setWhatName(korName)
    setWhatImage(image)
    setEra(era)
    setWhip(whip)
    setExceptionModal2(true)
  }
  const comparisonTwoway = (korName:string, image:string, era:number, whip:number, battingAvg:number, ops:number) => {
    setWhatName(korName)
    setWhatImage(image)
    setEra(era)
    setWhip(whip)
    setBattingAvg(battingAvg)
    setOps(ops)
    setExceptionModal2(true)
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
        <hr/>
        <p>결과 관련 이 아래에 뜰거임ㅇㅇ</p>
        <hr/>
        {exceptionModal1 && (
          <div>{exceptionModal1Message}</div>
        )}
        <br/>
        <div>
          {hitters?.map((player:any) => (
            <div key={player.playerId} onClick={() => comparisonHitter(player.korName, player.image, player.batting_avg, player.ops)}>
              <img src={player.image} alt="이미지"/>
              <p>{player.korName}</p>
            </div>
          ))}
          <br/>
          {pitchers?.map((player:any) => (
            <div key={player.playerId} onClick={() => comparisonPitcher(player.korName, player.image, player.era, player.whip)}>
              <img src={player.image} alt="이미지"/>
              <p>{player.korName}</p>
            </div>
          ))}
          <br/>
          {twoways?.map((player:any) => (
            <div key={player.playerId} onClick={() => comparisonTwoway(player.korName, player.image, player.era, player.whip, player.batting_avg, player.ops)}>
              <img src={player.image} alt="이미지"/>
              <p>{player.korName}</p>
            </div>
          ))}
        </div>
      </Modal>
      <Modal
        title="선수 비교 창!!!!"
        open={exceptionModal2}
        onOk={() => resetModal2()}
        onCancel={() => resetModal2()}
      >
        <div>
          {playerScore && (
            <div>
              <div>
                <p>왼쪽 선수</p>
                <img src={playerData.image} alt="이미지" />
                <p>{playerData.korName}</p>
                {playerScore.playerHitting?.battingAvg > 0 && <p> 타율 : {playerScore.playerHitting.battingAvg}</p>}
                {playerScore.playerHitting?.ops > 0 && <p> OPS : {playerScore.playerHitting.ops}</p>}
                {playerScore.playerPitching?.era > 0 && <p> 평균 자책점: {playerScore.playerPitching.era}</p>}
                {playerScore.playerPitching?.whip > 0 && <p> WHIP : {playerScore.playerPitching.whip}</p>}
              </div>
              <hr/>
              <div>
                <p>비교 대상</p>
                {whatImage && <img src={whatImage} alt="이미지"/>}
                {whatName && <p>{whatName}</p>}
                {battingAvg > 0 && <p> 타율 : {battingAvg}</p>}
                {ops > 0 && <p> OPS : {ops}</p>}
                {era > 0 && <p> 평균 자책점: {era}</p>}
                {whip > 0 && <p> WHIP : {whip}</p>}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default PlayerDetailPage;
