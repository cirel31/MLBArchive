"use client";
import { useSelector } from "react-redux";
import {useRouter} from "next/navigation";

const FollowedPlayer = () => {
  const followList = useSelector((state: any) => state.user.followList);
    const router = useRouter();
    return (
      <>
        <h3>[ FOLLOW PLAYER ]</h3>
        <div>
          {followList?.PlayerList ? (
            <div>
              <div style={{ display: "flex" }}>
                {followList.PlayerList.map((player: any) => (
                  <div
                    key={player.playerId}
                    onClick={() => router.push(`/players/${player.playerId}`)}
                  >
                    <div className="miniCard">
                      <img
                        src={player.image}
                        alt="이미지없음"
                        className="playerImage"
                      />
                      <div>{player.name}</div>
                      <div>{player.korName}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>팔로우한 선수들이 없습니다.</p>
          )}
        </div>
      </>
  );
};

export default FollowedPlayer;
