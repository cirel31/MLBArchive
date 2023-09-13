import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import Swal from "sweetalert2"
import {fetchPlayerWordData} from "@/app/redux/features/searchPlayerSlice";
import {useRouter} from "next/navigation";

const SearchPlayer = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [searchData, setSearchData] = useState('')
  const playerResult = useSelector((state: any) => state.searchPlayer.wordParseResult)
  const searchPlayer = () => {
    console.log('시;발')
    console.log(searchData)
    if (searchData.length < 2) {
      Swal.fire({
        title: '경 고',
        icon: 'warning',
        iconColor: 'red',
        text: '검색어는 2글자 이상이어야 합니다.'
      })
    }
    else {
      console.log('디스패치 실행')
      dispatch(fetchPlayerWordData(searchData))
    }
  }
  return (
    <>
      <div>
        <h1>
          검색할 선수의 이름을 입력해 주세요.
        </h1>

        <input
          type="text"
          autoFocus
          value={searchData}
          onChange={e => setSearchData(e.target.value)}
        />

        <button onClick={searchPlayer}>
          확인
        </button>
        {playerResult.map((player: any) => (
          <div key={player.id} onClick={() => router.push(`/players/${player.id}`)}>
            {player.id}
            {player.name}
          </div>
        ))}
      </div>
    </>
  )
}

export default SearchPlayer