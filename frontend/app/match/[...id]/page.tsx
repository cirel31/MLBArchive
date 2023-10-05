"use client";
import MatchData from "@/app/components/match/matchData";
import MatchLineScore from "@/app/components/match/matchLineScore";
import "../../../styles/MatchLineScore.css";
import {useEffect} from "react";
import {requestDetailMatchData} from "@/app/redux/features/matchSlice";
import {useDispatch, useSelector} from "react-redux";

const MatchPage = () => {
  const dispatch = useDispatch()
  const matchData = useSelector((state:any) => state.match.matchDetailData)
  useEffect(() => {
    const parsing = window.location.href.split("match/")[1];
    console.log(parsing)
    dispatch(requestDetailMatchData(parsing));
  }, [])
  return (
    <>
      {matchData &&
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="match_box ">
            <MatchLineScore />
            <MatchData />
          </div>
        </div>
      }
    </>
  );
};

export default MatchPage;
