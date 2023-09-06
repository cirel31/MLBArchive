'use client'
import {useEffect, useRef, useState} from "react";
import "../../styles/LoginPageStyle.scss"
import Image from 'next/image'
import kakao_btn from "../../assets/btn/kakao_btn_login.png"
import google_btn_dark from "../../assets/btn/google_btn_dark.png"
import naver_btn_light from "../../assets/btn/naver_btn_light.png"

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {

  }, [])

  const API_KEY_KAKAO = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID
  const REDIRECT_URI_KAKAO = 'http://localhost:3000/oauth/kakao'
  const OAUTH_KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY_KAKAO}&redirect_uri=${REDIRECT_URI_KAKAO}&response_type=code`;

  const API_KEY_GOOGLE = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const REDIRECT_URI_GOOGLE = 'http://localhost:3000/oauth/google'
  const OAUTH_GOOGLE = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${API_KEY_GOOGLE}&response_type=token&redirect_uri=${REDIRECT_URI_GOOGLE}&scope=https://www.googleapis.com/auth/userinfo.email`

  const API_KEY_NAVER = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID
  const REDIRECT_URI_NAVER = 'http://localhost:3000/oauth/naver'

  const OAUTH_NAVER = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${API_KEY_NAVER}&redirect_uri=${REDIRECT_URI_NAVER}`


  return (
    <div className="loginContents">
      <a href={OAUTH_NAVER} className="loginItem">
        <Image src={naver_btn_light} alt="네이버 로그인" className="oauthLogo" />
      </a>
      <a href={OAUTH_KAKAO} className="loginItem">
        <Image src={kakao_btn} alt="카카오 로그인" className="oauthLogo" />
      </a>
      <a href={OAUTH_GOOGLE} className="loginItem">
        <Image src={google_btn_dark} alt="구글 로그인" className="oauthLogo" />
      </a>
    </div>
  )
}

export default LoginPage;