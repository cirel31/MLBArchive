import React from "react";
import TeamRank from "./TeamRank";
import PlayerRank from "./PlayerRank";

const TeamStanding = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="teamrank">
          <TeamRank />
        </div>
        <div className="rank">
          <PlayerRank />
        </div>
      </div>
    </>
  );
};

export default TeamStanding;
