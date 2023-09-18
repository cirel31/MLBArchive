'use client'
import sample from "../../assets/player/sample_profile_img.jpg"
import Image, {StaticImageData} from "next/image";
import {useState} from "react";
import "../../styles/SearchPlayerPageStyle.scss"
import {useDispatch, useSelector} from "react-redux";
import {fetchPlayerLetterData} from "@/app/redux/features/searchPlayerSlice";
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
  const [nowPage, setNowPage] = useState(1)
  const articlePerPage = 30
  const [isActive, setIsActive] = useState([
    false, false, false, false, false, false,
    false, false, false, false, false, false,
    false, false, false, false, false, false,
    false, false, false, false, false, false,
    false, false
  ])
  const alphabets =  Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const [players, setPlayers] = useState([
    {'id': 1, 'profile_img': sample, 'lastName': 'Park', 'firstName': 'Chanho','number': 61, 'team': 'LosAngelesDodgers', 'teamCode': 'LAD'},
    {'id': 2, 'profile_img': sample, 'lastName': 'Park', 'firstName': 'Chanho', 'number': 61, 'team': 'LosAngelesDodgers', 'teamCode': 'LAD'},
  ])
  const backgroundCheck = (idx:number) => {
    const updatedIsActive = isActive.map((_, index) => index === idx);
    setIsActive(updatedIsActive);
    const selectedAlphabet = alphabets[idx]
    console.log(selectedAlphabet)
    const action = {
      searchData: selectedAlphabet, nowPage: nowPage, articlePerPage: articlePerPage
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
        {searchLetter.map((player: any) => (
          <div key={player.id} className='playerContent' onClick={() => handleDetailPage(player.id)}>
            <Image src={player.img} alt={player.name} className='profile'/>
            <div>
              <p>{player.name}</p>
              <p>{player.team} {player.number}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AllPlayers
