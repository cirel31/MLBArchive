'use client'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchFollowData, fetchReUserData, fetchUserLogout} from "@/app/redux/features/userSlice";
import {useRouter} from "next/navigation";
import FollowedTeam from "@/app/components/user/followedTeam";
import FollowedPlayer from "@/app/components/user/followedPlayer";
import "../../../styles/MyPageStyle.scss"
import Image from "next/image";
import systemImg from "../../../assets/system.png"

const MyPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const userData = useSelector((state: any) => state.user.userData)
  const followList = useSelector((state:any) => state.user.followList)
  const dispatch = useDispatch()
  const router = useRouter()
  const isLoggedIn: boolean = useSelector((state:any) => state?.user?.isLoggedIn)

  useEffect(() => {
    if (!isLoggedIn && !sessionStorage.getItem("refreshToken") ) {
      console.log(isLoggedIn)
      router.push(`/login`)
    }
  })
  useEffect(() => {
    if (sessionStorage.getItem("refreshToken")) {
      dispatch(fetchReUserData())
    }
  }, [])

  const TestBTN = () => {
    dispatch(fetchFollowData())
  }

  const testBTN = () => {
    dispatch(fetchUserLogout())
  }
  return (
    <>
      <div>
        {userData &&
          (
            <div className="myInfoContents">
              <div className="profile">
                <img src={userData.image} alt="이미지에러" className="profileImage"/>
                <div>
                  <div>{userData.nickname}</div>
                  <div>{userData.email}</div>
                </div>
                <Image src={systemImg} alt="설정 이미지" width={80} height={80}/>
              </div>
              <div className="followList">
                <FollowedTeam />
                <FollowedPlayer />
              </div>
            </div>
          )
        }
        <div>
          <button onClick={TestBTN}>팔로우 목록 가져오기</button>

        </div>

        <div>
          <button onClick={testBTN}>로그아웃 테스트 1</button>
        </div>

      </div>
    </>
  )
}

export default MyPage