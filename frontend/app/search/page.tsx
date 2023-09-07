'use client'
import {useState} from "react";
import "../../styles/SearchPageStyle.scss"
import SearchMatch from "@/app/search/SearchMatch";
import SearchTeam from "@/app/search/SearchTeam";
import SearchPlayer from "@/app/search/SearchPlayer";

const SearchPage: React.FC = () => {
  const [match, setMatch] = useState(false)
  const [team, setTeam] = useState(false)
  const [player, setPlayer] = useState(false)
  const SearchKind = (kind:string) => {
    if (kind === 'match') {
      setMatch(true)
      setTeam(false)
      setPlayer(false)
    }
    else if (kind === 'team') {
      setMatch(false)
      setTeam(true)
      setPlayer(false)
    }
    else if (kind === 'player') {
      setMatch(false)
      setTeam(false)
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
          <button className="chooseSearchButton" onClick={() => SearchKind('team')}>
            구단 검색
          </button>
          <button className="chooseSearchButton" onClick={() => SearchKind('player')}>
            선수 검색
          </button>
        </div>
        <div className="chooseResult">
          {match && <SearchMatch />}
          {team && <SearchTeam />}
          {player && <SearchPlayer />}
        </div>
      </div>
    </>
  )
}

export default SearchPage