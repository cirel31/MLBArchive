'use client'
import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {fetchUserData} from "@/app/redux/features/userSlice";

const KakaoLoginPage = () => {
  let state: string | null = null;
  let code: string | null = null;
  if (typeof window !== 'undefined') {
    code = window.location.href.split("code=")[1]?.split("&")[0];
    state = window.location.href.split("state=")[1]?.split("&")[0];
  }
  console.log(code)
  const dispatch = useDispatch()
  useEffect(() => {
    if (code) {
      const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL
      const SERVER_KAKAO_URL = process.env.NEXT_PUBLIC_OAUTH_KAKAO_SERVER_URL
      const accessKey = {
        code : code,
        state : state
      }
      console.log("useEffect 실행됌", accessKey)
      axios.post(`${SERVER_BASE_URL}${SERVER_KAKAO_URL}`,
          // ?code=${code}?state=${state}
        accessKey,
        {
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((response) => {
          console.log("엑시오스 성공", response.data)
        })
        .catch((error) => {
          console.log(error)
          console.log(accessKey)
        })
      // console.log(`${SERVER_BASE_URL}${SERVER_KAKAO_URL}?code=${code}?state=${state}`)
      // dispatch(fetchUserData(code))
    }
  }, [code])
  return (
    <>
      <div>
        카카오 로그인 로직 진행 중
      </div>
    </>
  )
}

export default KakaoLoginPage