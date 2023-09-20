import TeamRank from "@/app/main/components/TeamRank";
import PlayerRank from "@/app/main/components/PlayerRank";

const TeamStanding = () => {
  return (
    <>
      {/* <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="teamrank">
          팀랭킹
          <TeamRank />
        </div>
        <div className="rank">
          선수랭킹
          <HitterRank />
          <PitcherRank />
        </div>
      </div> */}
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
