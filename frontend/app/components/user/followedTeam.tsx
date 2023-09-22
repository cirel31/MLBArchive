"use client"
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";

const   FollowedTeam = () => {
  const followList = useSelector((state:any) => state.user.followList)
  const router = useRouter()
  return (
    <>
      <div>
        {
          followList?.PlayerList
            ? (
              <div>
                <div>팔로우 한 선수들</div>
                <div>{followList.PlayerList.map((player:any) => (
                  <div key={player.playerId} onClick={() => router.push(`/players/${player.playerId}`)}>
                    <div>영문 이름 : {player.name}</div>
                    <div>한글 이름 : {player.korName}</div>
                    <img src={player.image} alt="이미지없음"/>
                  </div>
                ))}</div>
              </div>
            )
            : (<p>팔로우한 선수들이 없습니다.</p>)
        }
      </div>
    </>
  )
}

export default FollowedTeam