"use client"
import {useSelector} from "react-redux";

const FollowedTeam = () => {
  const followList = useSelector((state:any) => state.user.followList)

  return (
    <>
      <div>{followList?.PlayerList ? (<p>팔로우 한 선수들</p>) : (<p>팔로우한 선수들이 없습니다.</p>)}</div>
    </>
  )
}

export default FollowedTeam