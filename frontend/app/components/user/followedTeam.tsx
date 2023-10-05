"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const FollowedTeam = () => {
  const followList = useSelector((state: any) => state.user.followList);
  const router = useRouter();
  return (
    <>
      <div className="main_title">[ FOLLOW TEAM ]</div>
      {/* <h2>[ FOLLOW TEAM ]</h2> */}
      <div>
        {followList?.TeamList ? (
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {followList.TeamList.map((team: any) => (
                <div
                  key={team.teamId}
                  onClick={() => router.push(`/teams/${team.teamId}`)}
                >
                  <div className="miniCard2">
                    <img
                      src={team.teamLogo}
                      alt="이미지없음"
                      className="playerImage2"
                      style={{ backgroundColor: "white" }}
                    />
                    <div>{team.teamName}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>팔로우한 팀이 없습니다.</p>
        )}
      </div>
    </>
  );
};

export default FollowedTeam;
