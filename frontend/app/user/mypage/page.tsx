'use client'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchFollowData, fetchReUserData, fetchUserLogout} from "@/app/redux/features/userSlice";
import {useRouter} from "next/navigation";

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
        {/*{Object.entries(userData as Record<string, string>).map(([key, value]) => (*/}
        {/*  <div key={key}>*/}
        {/*    {/.(jpg|png|gif)$/.test(value) ? (*/}
        {/*      <img src={value} alt={key} />*/}
        {/*    ) : (value)}*/}
        {/*  </div>*/}
        {/*))}*/}
        {userData &&
          (
            <div>
              <div>{userData.userId}</div>
              <div>{userData.nickname}</div>
              <div>{userData.email}</div>
              <img src={userData.image} alt="이미지에러"/>
              <div>{followList?.TeamList ? (<p>팔로우 한 팀들</p>) : (<p>팔로우한 팀들이 없습니다.</p>)}</div>
              <div>{followList?.PlayerList ? (<p>팔로우 한 선수들</p>) : (<p>팔로우한 선수들이 없습니다.</p>)}</div>
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