import RecentGame from "@/app/main/components/RecentGame";
import TeamStanding from "@/app/main/components/TeamStanding";
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
