"use client";
import TeamRank from "@/app/main/components/TeamRank";
import PlayerRank from "@/app/main/components/PlayerRank";
import News from "../../teams/[...name]/news";
const TeamStanding = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          margin: "0 auto",
        }}
      >
        <div className="teamrank">
          <TeamRank />
        </div>
        <div className="teamrank2">
          <PlayerRank />
        </div>

        {/* <div className="rank"><News /></div> */}
      </div>
    </>
  );
};

export default TeamStanding;
