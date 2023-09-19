import {useSelector} from "react-redux";

const FollowedPlayer = () => {
  const followList = useSelector((state:any) => state.user.followList)
  return (
    <>
      <div>{followList?.TeamList ? (<p>팔로우 한 팀들</p>) : (<p>팔로우한 팀들이 없습니다.</p>)}</div>
    </>
  )
}

export default FollowedPlayer