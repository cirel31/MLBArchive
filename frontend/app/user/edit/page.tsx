'use client'
import {useDispatch, useSelector} from "react-redux";
import {AxiosResponse} from "axios";
import {fetchHittingRankerDataAPI} from "@/app/redux/api/rankAPI";
import {userInfoUpdateAPI} from "@/app/redux/api/userAPI";
import {useEffect, useState} from "react";
import {fetchReUserData} from "@/app/redux/features/userSlice";

const ProfileEditPage = () => {
  const userInfo = useSelector((state:any) => state.user.userData) ?? null
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [img, setImg] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("실행중")
    dispatch(fetchReUserData())
  }, [])
  useEffect(() => {
    console.log(userInfo)
    if (userInfo) {
      setName(userInfo.nickName)
      setEmail(userInfo.email)
      setImg(userInfo.image)
    }
  }, [userInfo])


  // const userInfoChange = () => {
  //   const data = {
  //
  //   }
  //   const response: Promise<AxiosResponse> = userInfoUpdateAPI(accessToken, data)
  //     response
  //       .then((response) => {
  //
  //       })
  //       .catch((error) => {
  //
  //       })
  // }

  return (
    <>
      <div>
        {userInfo && (
          <div>
            <div>{userInfo.email}</div>
            <div>{userInfo.image}</div>
          </div>
        )}
        <p>이름: {name}</p>
        <p>이메일: {email}</p>
        <p>이미지:
          <img src={img} alt=""/>
        </p>
      </div>
      {console.log(userInfo)}
    </>
  )
}

export default ProfileEditPage