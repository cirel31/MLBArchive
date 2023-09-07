import RecentGame from "@/app/main/RecentGame";
import TeamStanding from "@/app/main/TeamStanding";
import "../../styles/MainPageStyle.scss"

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
        </div>
      </div>
    </>
  )
}

export default MainPage