'use client'
import sample from "../../assets/player/sample_profile_img.jpg"
import Image, {StaticImageData} from "next/image";
import {useState} from "react";
import "../../styles/SearchPlayerPageStyle.scss"
import {useDispatch, useSelector} from "react-redux";
import {fetchPlayerLetterData, fetchPlayerWordData} from "@/app/redux/features/searchPlayerSlice";
import {useRouter} from "next/navigation";

type PlayerType = {
  id: number
  name: string
  number: number
  team: string
  profile_img: StaticImageData
  teamCode: string
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

  const handleDetailPage = (id:string) => {
    router.push(`players/${id}`)
  }


  return (
    <>
      <div className='searchAlphabet'>
        {alphabets.map((alphabet, index) => (
          <div
            key={index}
            className={`alphabet ${isActive[index] ? 'clicked_alphabet' : ''}`}
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
    </>
  )
}

export default AllPlayers
