import RecentGame from "@/app/main/RecentGame";
import TeamStanding from "@/app/main/TeamStanding";
import "../../styles/MainPageStyle.scss"
import HitterRank from "@/app/main/HitterRank";

const MainPage = () => {

  return (
    <>
      <div>
        <h3>메인 페이지</h3>
        <br/>
        <hr/>
        <br/>
        <div className="main-content01">
          <RecentGame />
          <TeamStanding />
          <HitterRank />
        </div>
      </div>
    </>
  )
}

export default MainPage