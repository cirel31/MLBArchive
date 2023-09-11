'use client'
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {fetchUserDataNaver} from "@/app/redux/features/userSlice";
import axios from "axios";

const NaverLoginPage = () => {
  let code: string | null = null;
  let state: string | null = null;
  if (typeof window !== 'undefined') {
    code = window.location.href.split("code=")[1]?.split("&")[0];
    state = window.location.href.split("state=")[1]?.split("&")[0];
  }
  const dispatch = useDispatch()
  useEffect(() => {
    const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL
    const SERVER_NAVER_URL = process.env.NEXT_PUBLIC_OAUTH_NAVER_SERVER_URL
    const accessKey = {
      code: code,
      state: state,
      kind: 'naver',
    }
    console.log("kind", accessKey.kind)
    console.log("useEffect 실행됌", accessKey)
    axios.get(`${SERVER_BASE_URL}${SERVER_NAVER_URL}?code=${code}?state=${state}`)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    console.log(`${SERVER_BASE_URL}${SERVER_NAVER_URL}?code=${code}?state=${state}`)
      // dispatch(fetchUserDataNaver(accessKey))
  }, [code])
  return (
    <>
      <div>
        네이버 로그인 로직 진행 중
      </div>
    </>
  )
}

export default NaverLoginPage