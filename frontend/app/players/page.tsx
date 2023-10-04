"use client";
import sample from "../../assets/player/sample_profile_img.jpg";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import "../../styles/SearchPlayerPageStyle.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPlayerLetterData,
  fetchPlayerWordData,
} from "@/app/redux/features/searchPlayerSlice";
import { useRouter } from "next/navigation";
import playerFace from "@/app/players/[...id]/current.png";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { Table, Typography } from "antd";
const { Title } = Typography;
type PlayerType = {
  id: number;
  name: string;
  number: number;
  team: string;
  profile_img: StaticImageData;
  teamCode: string;
};
const AllPlayers = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchLetter = useSelector(
    (state: any) => state.searchPlayer.firstLetterList
  );
  const totalPage = useSelector((state: any) => state.searchPlayer.totalPage);
  const [nowPage, setNowPage] = useState(0);
  const [searchData, setSearchData] = useState("");
  const articlePerPage = 30;
  const [isActive, setIsActive] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const alphabets = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const backgroundCheck = (idx: number) => {
    const updatedIsActive = isActive.map((_, index) => index === idx);
    setIsActive(updatedIsActive);
    const selectedAlphabet = alphabets[idx];
    setSearchData(selectedAlphabet);
    // 알파벳 이동 시 페이지 시작 지점 0으로 설정
    setNowPage(0);
    const action = {
      searchData: selectedAlphabet,
      nowPage: 0,
      articlePerPage: articlePerPage,
    };
    dispatch(fetchPlayerLetterData(action));
  };
  const searchQuery = (x: number) => {
    let idx = 0;
    if (x === 0 || nowPage + x < 0) {
      setNowPage(0);
    } else if (nowPage + x >= totalPage || x === totalPage) {
      idx = totalPage - 1;
      setNowPage(idx);
    } else {
      idx = nowPage + x;
      setNowPage(idx);
    }
    const action = {
      searchData: searchData,
      nowPage: idx,
      articlePerPage: 30,
    };
    dispatch(fetchPlayerLetterData(action));
  };

  const handleDetailPage = (id: string) => {
    router.push(`players/${id}`);
  };

  const [activeCard, setActiveCard] = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState(null);

  const handleMouseMove = (e: any, cardIndex: any) => {
    const l = e.nativeEvent.offsetX;
    const t = e.nativeEvent.offsetY;
    const h = e.currentTarget.clientHeight;
    const w = e.currentTarget.clientWidth;
    const lp = Math.abs(Math.floor((100 / w) * l) - 100);
    const tp = Math.abs(Math.floor((100 / h) * t) - 100);
    const bg = `background-position: ${lp}% ${tp}%;`;
    const style: any = `.card.active:before { ${bg} }`;

    setActiveCard(cardIndex);
    setBackgroundStyle(style);
  };

  const handleMouseOut = () => {
    setActiveCard(null);
    setBackgroundStyle(null);
  };

  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <div className="p_title">
        <p className="p_title">Players</p>
      </div>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </Helmet>
      <div className="searchAlphabet">
        {alphabets.map((alphabet, index) => (
          <div
            key={index}
            className={`alphabet ${isActive[index] ? "clicked_alphabet" : ""}`}
            onClick={() => backgroundCheck(index)}
          >
            {alphabet}
          </div>
        ))}
      </div>
      <div className="totalCard">
        {searchLetter ? (
          searchLetter.map((player: any) => (
            <div
              key={player.id}
              className="playerContent"
              onClick={() => handleDetailPage(player.id)}
            >
              <div>
                <p> {player.team}</p>
                <p>{player.number}</p>
                <main id="app">
                  <div
                    className={`card ${isFlipped ? "flipped" : ""}`}
                    onClick={handleCardFlip}
                  >
                    <div className="face face-front">
                      {/* <div className="card charizard"> */}
                      <div className="playerCard">
                        <div className="container">
                          <div className="circle2">
                            {player.backnumber === -1 ? "-" : player.backnumber}
                          </div>
                          <img
                            src={player.image}
                            alt={player.name}
                            className="playerFace2"
                            style={{ zIndex: "99999" }}
                          />
                          <div className="rectangle">
                            <div className="rectangle2"></div>
                            <div>
                              <div className="position2">{player.name}</div>
                              <div>
                                <div className="position">
                                  {player.height}cm / {player.weight}kg
                                </div>
                              </div>
                            </div>
                            <div className="position">
                              POSITION : {player.mainPosition}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                    <div className="face face-back">
                      <img src={player.image} alt="" />
                    </div>
                  </div>
                </main>
              </div>
            </div>
          ))
        ) : (
          <div>알파벳을 선택해 주세요.</div>
        )}
      </div>
      <div>
        <button onClick={() => searchQuery(0)}>
          <span className="material-symbols-outlined">
            keyboard_double_arrow_left
          </span>
        </button>
        <button onClick={() => searchQuery(-1)}>
          <span className="material-symbols-outlined">keyboard_backspace</span>
        </button>
        <button onClick={() => searchQuery(+1)}>
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </button>
        <button onClick={() => searchQuery(totalPage)}>
          <span className="material-symbols-outlined">
            keyboard_double_arrow_right
          </span>
        </button>
        {/* 전체 페이지 중 현재 페이지 표시 */}
        <div>
          {nowPage + 1} / {totalPage}
        </div>
      </div>
    </>
  );
};

export default AllPlayers;
