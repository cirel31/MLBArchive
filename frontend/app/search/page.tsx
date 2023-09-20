'use client'
import {useState} from "react";
import "../../styles/SearchPageStyle.scss"
import SearchMatch from "@/app/search/SearchMatch";
import SearchPlayer from "@/app/search/SearchPlayer";

const SearchPage: React.FC = () => {
  const [match, setMatch] = useState(false)
  const [player, setPlayer] = useState(false)
  const SearchKind = (kind:string) => {
    if (kind === 'match') {
      setMatch(true)
      setPlayer(false)
    }
    else if (kind === 'player') {
      setMatch(false)
      setPlayer(true)
    }
  }

  return (
    <>
      <div>
        <div className="chooseSearchType">
          <button className="chooseSearchButton" onClick={() => SearchKind('match')}>
            경기 검색
          </button>
          <button className="chooseSearchButton" onClick={() => SearchKind('player')}>
            선수 검색
          </button>
        </div>
        <div className="chooseResult">
          {match && <SearchMatch />}
          {player && <SearchPlayer />}
        </div>
      </div>
    </>
  )
}

export default SearchPage