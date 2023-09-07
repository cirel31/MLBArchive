'use client'
import {useEffect, useState} from "react";
import axios from "axios";

const NaverLoginPage = () => {
  const API_KEY_NAVER = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
  const API_SECRETE_NAVER = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET
  const parsingData = window.location.href.split("code=")[1]?.split("&")[0]
  const code = parsingData
  console.log(code)
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = '';
  const subURL = '';
  useEffect(() => {
    if (code) {
      axios.get(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${API_KEY_NAVER}&client_secret=${API_SECRETE_NAVER}&code=${code}`)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
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