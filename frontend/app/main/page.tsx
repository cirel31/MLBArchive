import RecentGame from "@/app/main/RecentGame";
import TeamStanding from "@/app/main/TeamStanding";
import "../../styles/MainPageStyle.scss";

const MainPage = () => {
  return (
    <>
      <div>
        <div className="main-content01">
          <RecentGame />
          <TeamStanding />
        </div>
      </div>
    </>
  );
};

export default MainPage;
