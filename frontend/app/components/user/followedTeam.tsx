"use client";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const FollowedTeam = () => {
  const followList = useSelector((state: any) => state.user.followList);
  const router = useRouter();
  return (
    <>
      <h3>[ FOLLOW TEAM ]</h3>
      <div>
        {followList?.TeamList ? (
          <div>
            <div style={{ display: "flex" }}>
              {followList.TeamList.map((team: any) => (
                <div
                  key={team.teamId}
                  onClick={() => router.push(`/players/${team.teamId}`)}
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
