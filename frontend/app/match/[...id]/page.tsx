"use client";
import MatchData from "@/app/components/match/matchData";
import MatchLineScore from "@/app/components/match/matchLineScore";
import "../../../styles/MatchLineScore.css";

const MatchPage = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="match_box ">
        <MatchData />
        <MatchLineScore />
      </div>
    </div>
  );
};

export default MatchPage;
