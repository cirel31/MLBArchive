import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import Swal from "sweetalert2"
import {fetchPlayerWordData} from "@/app/redux/features/searchPlayerSlice";
import {useRouter} from "next/navigation";



const SearchPlayer = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [nowPage, setNowPage] = useState(0)
  const [searchData, setSearchData] = useState('')
  const playerResult = useSelector((state: any) => state.searchPlayer.wordParseResult)
  const totalPage = useSelector((state: any) => state.searchPlayer.totalPage)

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
    dispatch(fetchPlayerWordData(action))
  }

  const searchPlayer = () => {
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
      searchQuery(0)
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
        {
          playerResult?.length > 0 ? (
            <div>
              {
                playerResult.map((player: any) => (
                  <div key={player.id} onClick={() => router.push(`/players/${player.id}`)}>
                    <div style={{display:"flex", justifyContent:"space-evenly"}}>
                      <div>
                        {player.name}
                      </div>
                      <div>
                        {player.korName}
                      </div>
                      <div>
                        {player.height}
                      </div>
                      <div>
                        {player.weight}
                      </div>
                    </div>
                  </div>
                ))
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
          ) : (
            <div>검색된 선수가 없습니다</div>
          )
        }
        <div>
          <button onClick={() => searchQuery(-1)}>이전 페이지</button>
          <button onClick={() => searchQuery(+1)}>다음 페이지</button>
        </div>
      </div>
    </>
  )
}

export default SearchPlayer