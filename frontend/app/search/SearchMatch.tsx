import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {requestMatchData} from "@/app/redux/features/matchSlice";
const SearchMatch = () => {
  const dispatch = useDispatch()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [teamName, setTeamName] = useState('')
  const [nowPage, setPage] = useState(0)
  const matchList = useSelector((state:any) => state.match.matchData)
  function formatDate(date:Date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }
  const SearchMach = () => {
    console.log(startDate)
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const action = {
      teamName: teamName,
      start: formattedStartDate,
      end: formattedEndDate,
      nowPage:nowPage,
      articlePerPage:30
    }
    console.log(action)
    dispatch(requestMatchData(action))
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
        <input
          type="text"
          value={teamName}
          autoFocus
          onChange={e => setTeamName(e.target.value)}
        />

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
    </>
  )
}

export default SearchMatch