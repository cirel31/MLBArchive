import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import { fetchPlayerWordData } from "@/app/redux/features/searchPlayerSlice";
import { useRouter } from "next/navigation";
import { Helmet } from "react-helmet";
import { Table } from "antd";
import PlayerTable from "./PlayerTable";
import "../../styles/SearchPageStyle.scss";
import Image from "next/image";
import p_mainphoto from "../../assets/playersearch_main.jpg";

const SearchPlayer = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [nowPage, setNowPage] = useState(0);
  const [searchData, setSearchData] = useState("");
  const playerResult = useSelector(
    (state: any) => state.searchPlayer.wordParseResult
  );
  const totalPage = useSelector((state: any) => state.searchPlayer.totalPage);

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
      nowPage: nowPage,
      articlePerPage: 30,
    };
    dispatch(fetchPlayerWordData(action));
  };

  const searchPlayer = () => {
    console.log(searchData);
    if (searchData.length < 2) {
      Swal.fire({
        title: "경 고",
        icon: "warning",
        iconColor: "red",
        text: "검색어는 2글자 이상이어야 합니다.",
      });
    } else {
      searchQuery(0);
    }
  };
  const handleEnter = (e:  React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchPlayer()
    }
  }
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </Helmet>

      <div className="playsearching">
        <Image src={p_mainphoto} alt="로스터" style={{ width: "80%" }} />
        <p className="title">검색할 선수의 이름을 입력해 주세요.</p>
        <div className="teambox2">
          <div className="teambox1">
            <input
              className="searchname"
              type="text"
              autoFocus
              value={searchData}
              onKeyDown={handleEnter}
              onChange={(e) => setSearchData(e.target.value)}
            />
            <div className="name">
              <button onClick={searchPlayer}>확인</button>
            </div>
          </div>
        </div>
        <div>
          {/* MyTable 컴포넌트를 렌더링하면서 playerResult와 router를 속성(props)으로 전달 */}
          <PlayerTable />
        </div>

        {/* {playerResult?.length > 0 ? (
          <div>
            <table className="matchTable">
              <thead>
                <tr>
                  <th>선수 이름</th>
                  <th>한글 이름</th>
                  <th>키</th>
                  <th>몸무게</th>
                </tr>
              </thead>
              <tbody>
                {playerResult.map((player: any) => (
                  <tr
                    key={player.id}
                    onClick={() => router.push(`/players/${player.id}`)}
                  >
                    <td>{player.name}</td>
                    <td>{player.korName}</td>
                    <td>{player.height === -1 ? "-" : player.height}</td>
                    <td>{player.weight === -1 ? "-" : player.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={() => searchQuery(0)}>
                {" "}
                <span className="material-symbols-outlined">
                  keyboard_double_arrow_left
                </span>
              </button>
              <br />
              <br />
              <button onClick={() => searchQuery(-1)}>
                {" "}
                <span className="material-symbols-outlined">
                  keyboard_backspace
                </span>
              </button>
              <br />
              <br />
              <button onClick={() => searchQuery(+1)}>
                {" "}
                <span className="material-symbols-outlined">
                  arrow_right_alt
                </span>
              </button>
              <br />
              <br />
              <button onClick={() => searchQuery(totalPage)}>
                {" "}
                <span className="material-symbols-outlined">
                  keyboard_double_arrow_right
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div>검색된 선수가 없습니다</div>
        )} */}
        {/* <div style={{ display: "flex" }}>
          <button onClick={() => searchQuery(-1)}>
            {" "}
            <span className="material-symbols-outlined">
              keyboard_backspace
            </span>
          </button>
          <br />
          <br />
          <button onClick={() => searchQuery(+1)}>
            {" "}
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </button>
        </div> */}
      </div>
    </>
  );
};

export default SearchPlayer;
