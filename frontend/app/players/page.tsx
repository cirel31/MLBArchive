"use client"
import sample from "../../assets/player/sample_profile_img.jpg"
import Image, {StaticImageData} from "next/image";
import {useState} from "react";
import "../../styles/SearchPlayerPageStyle.scss"
import {useDispatch, useSelector} from "react-redux";
import {fetchPlayerLetterData, fetchPlayerWordData} from "@/app/redux/features/searchPlayerSlice";
import {useRouter} from "next/navigation";
import playerFace from "@/app/players/[...id]/current.png";

type PlayerType = {
  id: number;
  name: string;
  number: number;
  team: string;
  profile_img: StaticImageData;
  teamCode: string;
};
const AllPlayers = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchLetter = useSelector((state: any) => state.searchPlayer.firstLetterList)
  const totalPage = useSelector((state: any) => state.searchPlayer.totalPage)
  const [nowPage, setNowPage] = useState(0)
  const [searchData, setSearchData] = useState('')
  const articlePerPage = 30
  const [isActive, setIsActive] = useState([
    false, false, false, false, false, false,
    false, false, false, false, false, false,
    false, false, false, false, false, false,
    false, false, false, false, false, false,
    false, false
  ])
  const alphabets =  Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const backgroundCheck = (idx:number) => {
    const updatedIsActive = isActive.map((_, index) => index === idx);
    setIsActive(updatedIsActive);
    const selectedAlphabet = alphabets[idx]
    setSearchData(selectedAlphabet)
    const action = {
      searchData: selectedAlphabet, nowPage: nowPage, articlePerPage: articlePerPage
    }
    dispatch(fetchPlayerLetterData(action))
  }
  const searchQuery = (x:number) => {
    if (x === 0 || nowPage + x < 0) {
      setNowPage(0)
    }
    else if (nowPage + x >= totalPage || x === totalPage) {
      setNowPage(totalPage-1)
    }
    else {
      setNowPage(nowPage+x)
    }
    const action = {
      searchData: searchData, nowPage:nowPage, articlePerPage:30
    }
    dispatch(fetchPlayerLetterData(action))
  }

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

  const cards = ["charizard", "mewtwo", "dragonite"]; // Add more card names if needed

  return (
    <>
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
      <div>
        {searchLetter ? searchLetter.map((player: any) => (
          <div key={player.id} className='playerContent' onClick={() => handleDetailPage(player.id)}>
            <img src={player.image} alt={player.name} className='profile'/>
            <div>
              <p>{player.name}</p>
              <p>{player.team} {player.number}</p>
            </div>
          </div>

        )) :
          <div>알파벳을 선택해 주세요.</div>
        }
        <div>
          <button onClick={() => searchQuery(0)}>시작 페이지</button>
          <br/>
          <br/>
          <button onClick={() => searchQuery(-1)}>이전 페이지</button>
          <br/>
          <br/>
          <button onClick={() => searchQuery(+1)}>다음 페이지</button>
          <br/>
          <br/>
          <button onClick={() => searchQuery(totalPage)}>끝 페이지</button>
        </div>
      </div>
      <div className="cardzone">
        <main id="app">
          <div className="card charizard">
            <div className="playerCard">
              <div className="container">
                <div className="rectangle2">이름</div>
                <Image
                  src={playerFace}
                  alt=""
                  className="playerFace"
                  style={{ borderRadius: "10px" }}
                />

                <div className="rectangle">
                  <div className="circleBox">
                    <div>
                      <div className="circle">1</div>
                      <div className="circle2">2</div>
                    </div>
                    <div>
                      <div className="circle3">3</div>
                      <div className="circle4">4</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <main id="app">
          <div className="card charizard">
            <div className="playerCard">
              <div className="container">
                <Image src={playerFace} alt="" className="playerFace" />
                <div className="circle">1</div>
                <div className="circle2">2</div>
                <div className="circle3">3</div>
                <div className="rectangle">어쩌구</div>
                <div className="rectangle2">선수이름</div>
              </div>
            </div>
          </div>
        </main>
        <main id="app">
          <div className="card charizard">
            <div className="playerCard">
              <div className="container">
                <Image src={playerFace} alt="" className="playerFace" />
                <div className="circle">1</div>
                <div className="circle2">2</div>
                <div className="circle3">3</div>
                <div className="rectangle">어쩌구</div>
                <div className="rectangle2">선수이름</div>
              </div>
            </div>
          </div>
        </main>
        <main id="app">
          <div className="card charizard">
            <div className="playerCard">
              <div className="container">
                <Image src={playerFace} alt="" className="playerFace" />
                <div className="circle">1</div>
                <div className="circle2">2</div>
                <div className="circle3">3</div>
                <div className="rectangle">어쩌구</div>
                <div className="rectangle2">선수이름</div>
              </div>
            </div>
          </div>
        </main>
        <main id="app">
          <div className="card charizard">
            <div className="playerCard">
              <div className="container">
                <Image src={playerFace} alt="" className="playerFace" />
                <div className="circle">1</div>
                <div className="circle2">2</div>
                <div className="circle3">3</div>
                <div className="rectangle">어쩌구</div>
                <div className="rectangle2">선수이름</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AllPlayers;
