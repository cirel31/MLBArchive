import React from "react";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {requestDetailMatchData, requestMatchData} from "@/app/redux/features/matchSlice";
import {teamData} from "@/app/components/team/teamData";
import {useRouter} from "next/navigation";
import {fetchPlayerWordData} from "@/app/redux/features/searchPlayerSlice";
const SearchMatch = () => {
  const dispatch = useDispatch()
  const teamList = teamData
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [teamName, setTeamName] = useState('109')
  const [nowPage, setNowPage] = useState(0)
  const matchList = useSelector((state:any) => state.match?.matchData)
  const totalPage = useSelector((state: any) => state.searchPlayer.totalPage)

  const router = useRouter()
  function formatDate(date:Date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  const SearchMach = () => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    setNowPage(0)
    const action = {
      teamName: teamName,
      start: formattedStartDate,
      end: formattedEndDate,
      nowPage:0,
      articlePerPage:30
    }
    console.log(action)
    dispatch(requestMatchData(action))
  }
  const searchQuery = (x:number) => {
    let idx = 0
    if (x === 0 || nowPage + x < 0) {
      setNowPage(0)
    }
    else if (nowPage + x >= totalPage || x === totalPage) {
      idx = totalPage - 1
      setNowPage(idx)
    }
    else {
      idx = nowPage + x
      setNowPage(idx)
    }
    const action = {
      searchData: teamName, nowPage:nowPage, articlePerPage:30
    }
    dispatch(fetchPlayerWordData(action))
  }
  const searchDetailMatch = (id: string) => {
    console.log("로직 실행 확인 중")
    dispatch(requestDetailMatchData(id))
    router.push(`/match/${id}`)
  }
  return (
    <>
      <div>
        <h1>
          어떤 경기 결과를 검색하고 싶으신가요?
        </h1>
        <div>
          팀 이름
        </div>
        <select
          value={teamName}
          onChange={e => setTeamName(e.target.value)}
        >
          {teamList.map(team => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))
          }
        </select>
        <div>시작날짜</div>
        <DatePicker
          dateFormat='yyyy.MM.dd'
          shouldCloseOnSelect
          minDate={new Date('1900-01-01')}
          maxDate={new Date()}
          selected={startDate}
          onChange={(date:Date) => setStartDate(date)}
        />

        <div>종료날짜</div>
        <DatePicker
          dateFormat='yyyy.MM.dd'
          shouldCloseOnSelect
          minDate={startDate}
          maxDate={new Date()}
          selected={endDate}
          onChange={(date:Date) => setEndDate(date)}
        />

      </div>
      <button onClick={SearchMach}>검색</button>
      {
        matchList
        ?
          <div>
            {matchList.map(
              (match:
                {
                  id: number
                  homeName: string
                  awayName: string
                  matchDate: string
                  homeScore: number
                  awayScore: number
                }
              ) => (
              <div
                key={match.id}
                onClick={() => searchDetailMatch(String(match.id))}
              >
                <div>경기 id : {match.id}</div>
                <div>홈팀 : {match.homeName}</div>
                <div>어웨이팀 : {match.awayName}</div>
                <div>경기 날짜 : {match.matchDate}</div>
                <div>홈팀 점수 : {match.homeScore}</div>
                <div>어웨이팀 점수 : {match.awayScore}</div>
              </div>
            ))}
          </div>
        :
          <div>
            결과가 없습니다.
          </div>
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
    </>
  )
}

export default SearchMatch