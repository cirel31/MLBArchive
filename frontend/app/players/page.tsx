"use client";
import sample from "../../assets/player/sample_profile_img.jpg";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import "../../styles/SearchPlayerPageStyle.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlayerLetterData } from "@/app/redux/features/searchPlayerSlice";
import { useRouter } from "next/navigation";
import playerFace from "@/app/players/[...id]/fhzh.png";

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
  const [nowPage, setNowPage] = useState(0);
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
  // const [players, setPlayers] = useState([
  //   {'id': 1, 'profile_img': sample, 'lastName': 'Park', 'firstName': 'Chanho','number': 61, 'team': 'LosAngelesDodgers', 'teamCode': 'LAD'},
  //   {'id': 2, 'profile_img': sample, 'lastName': 'Park', 'firstName': 'Chanho', 'number': 61, 'team': 'LosAngelesDodgers', 'teamCode': 'LAD'},
  // ])
  const backgroundCheck = (idx: number) => {
    const updatedIsActive = isActive.map((_, index) => index === idx);
    setIsActive(updatedIsActive);
    const selectedAlphabet = alphabets[idx];
    const action = {
      searchData: selectedAlphabet,
      nowPage: nowPage,
      articlePerPage: articlePerPage,
    };
    dispatch(fetchPlayerLetterData(action));
  };

  const handleDetailPage = (id: string) => {
    router.push(`players/${id}`);
  };

  return (
    <>
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
        {searchLetter ? (
          searchLetter.map((player: any) => (
            <div
              key={player.id}
              className="playerContent"
              onClick={() => handleDetailPage(player.id)}
            >
              <Image src={player.img} alt={player.name} className="profile" />
              <div>
                <p>{player.name}</p>
                <p>
                  {player.team} {player.number}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div>알파벳을 선택해 주세요.</div>
        )}
      </div>
    </>
  );
};

export default AllPlayers;
