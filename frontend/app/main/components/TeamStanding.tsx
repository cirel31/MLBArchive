import HitterRank from "@/app/main/components/HitterRank";
import PitcherRank from "@/app/main/components/PitcherRank";
import TeamRank from "@/app/main/components/TeamRank";

const TeamStanding = () => {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="teamrank">
          팀랭킹
          <TeamRank />
        </div>
        <div className="rank">
          선수랭킹
          <HitterRank />
          <PitcherRank />
        </div>
      </div>
    </>
  );
};

export default TeamStanding;
