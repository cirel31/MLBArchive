'use client'
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {fetchUserData} from "@/app/redux/features/userSlice";
import axios from "axios";
const GoogleLoginPage = () => {
  let code: string | null = null;
  let scope: string | null = null;
  let state: string | null = null;
  if (typeof window !== 'undefined') {
    code = window.location.href.split("code=")[1]?.split("&")[0];
    scope = window.location.href.split("scope=")[1]?.split("&")[0];
    state = window.location.href.split("state=")[1]?.split("&")[0];
  }
  console.log("code : ", code, "scope : ", scope)
  const dispatch = useDispatch()
  useEffect(() => {
    const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL
    const SERVER_GOOGLE_URL = process.env.NEXT_PUBLIC_OAUTH_GOOGLE_SERVER_URL
    const accessKey = {
      code: code,
      state: state,
      kind: 'google',
    }
    console.log("useEffect 실행됌", accessKey)
    axios.get(`${SERVER_BASE_URL}${SERVER_GOOGLE_URL}?code=${code}?state=${state}`)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    console.log(`${SERVER_BASE_URL}${SERVER_GOOGLE_URL}?code=${code}?state=${state}`)
    // dispatch(fetchUserData(accessKey))

  }, [code])
  return (
    <>
      <div>
        구글 로그인 로직 진행 중
      </div>
    </>
  )
}

export default GoogleLoginPage