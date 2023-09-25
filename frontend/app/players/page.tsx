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
    const action = {
      searchData: selectedAlphabet,
      nowPage: nowPage,
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
    if (nowPage === idx && nowPage === 0) {
      Swal.fire("이미 제일 앞의 페이지 입니다.");
    } else if (nowPage === idx && nowPage === totalPage - 1) {
      Swal.fire("이미 제일 뒤의 페이지 입니다.");
    }
    dispatch(fetchPlayerLetterData(action));
  };

  const handleDetailPage = (id: string) => {
    router.push(`players/${id}`);
  };

  const [activeCard, setActiveCard] = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState(null);

  const handleMouseMove = (e, cardIndex) => {
    const l = e.nativeEvent.offsetX;
    const t = e.nativeEvent.offsetY;
    const h = e.currentTarget.clientHeight;
    const w = e.currentTarget.clientWidth;
    const lp = Math.abs(Math.floor((100 / w) * l) - 100);
    const tp = Math.abs(Math.floor((100 / h) * t) - 100);
    const bg = `background-position: ${lp}% ${tp}%;`;
    const style = `.card.active:before { ${bg} }`;

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
      <Title>Players</Title>
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
                          <div className="rectangle2">{player.name}</div>
                          <img
                            src={player.image}
                            alt={player.name}
                            className="playerFace"
                          />
                          <div className="rectangle">
                            <div className="circleBox">
                              <div>
                                <div className="circle">{player.number}</div>
                                <div className="circle2">2</div>
                              </div>
                              <div>
                                <div className="circle3">3</div>
                                <div className="circle4">4</div>
                              </div>
                              <p>{player.team}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                    <div className="face face-back">
                      팀마크
                      {player.team}
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
      </div>
    </>
  );
};

export default AllPlayers;
