'use client'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchReUserData} from "@/app/redux/features/userSlice";

const MyPage = () => {
  const userData = useSelector((state: any) => state.user.userData)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchReUserData())
  }, [])

  const testBTN = () => {
    dispatch(fetchReUserData())
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
            </div> 
          )
        }
        <p>아 지랄 자제좀;;</p>
        <button onClick={testBTN}>유저 정보 다시 받아오기 테스트 1</button>
      </div>
    </>
  )
}

export default MyPage