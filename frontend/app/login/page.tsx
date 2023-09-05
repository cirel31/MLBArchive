'use client'
import {useEffect, useRef, useState} from "react";
import "../../styles/LoginPageStyle.scss"
import Image from 'next/image'
import kakao_btn from "../../assets/btn/kakao_btn_login.png"
import google_btn_dark from "../../assets/btn/google_btn_dark.png"
import naver_btn_light from "../../assets/btn/naver_btn_light.png"

const LoginPage = () => {

  // const API_KEY_KAKAO = process.env.KAKAO_CLIENT_ID
  // const REDIRECT_URI_KAKAO = 'http://localhost:3000/oauth/kakao'
  // const OAUTH_KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY_KAKAO}&redirect_uri=${REDIRECT_URI_KAKAO}&response_type=code`;
  //
  // const API_KEY_GOOGLE = process.env.GOOGLE_CLIENT_ID
  // const REDIRECT_URI_GOOGLE = 'http://localhost:3000/oauth/google'
  // const OAUTH_GOOGLE = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${API_KEY_GOOGLE}&response_type=token&redirect_uri=${REDIRECT_URI_GOOGLE}&scope=https://www.googleapis.com/auth/userinfo.email`
  //
  // const API_KEY_NAVER = process.env.NAVER_CLIENT_ID
  // const REDIRECT_URI_NAVER = 'http://localhost:3000/oauth/naver'

  const API_KEY_KAKAO = '95c1afd6556eaccfc74b8b91ddc4dfd8'
  const REDIRECT_URI_KAKAO = 'http://localhost:3000/oauth/kakao'
  const OAUTH_KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY_KAKAO}&redirect_uri=${REDIRECT_URI_KAKAO}&response_type=code`;

  const API_KEY_GOOGLE = '290380345753-n9nji0qbbk82nufhgi52u22t6fdj1d4f.apps.googleusercontent.com'
  const REDIRECT_URI_GOOGLE = 'http://localhost:3000/oauth/google'
  const OAUTH_GOOGLE = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${API_KEY_GOOGLE}&response_type=token&redirect_uri=${REDIRECT_URI_GOOGLE}&scope=https://www.googleapis.com/auth/userinfo.email`

  const API_KEY_NAVER = 'Iz4VmbwNjHx920gMOY0p'
  const REDIRECT_URI_NAVER = 'http://localhost:3000/oauth/naver'

  const [naverScriptLoaded, setNaverScriptLoaded] = useState(false);


  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js';
    script.onload = () => {
      setNaverScriptLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: API_KEY_NAVER,
      callbackUrl: REDIRECT_URI_NAVER,
      isPopup: false,
      loginButton: { color: 'green', type: 2},
      callbackHandle: true,
    })
    naverLogin.init()
  }

  let naver:any;
  useEffect(() => {
     naver = window?.naver
    if (naverScriptLoaded) {
      initializeNaverLogin();
    }
  }, [naverScriptLoaded]);

  const naverRef = useRef<HTMLButtonElement>(null)
  if (naverRef.current) {
    const firstChild = naverRef.current.children[0] as HTMLElement;
  }
  return (
    <div className="loginContents">
      <div className="loginItem">
        <button
          id='naverIdLogin'
          ref={naverRef}
          style={{display:'none'}}
        >
        </button>
        <button
          onClick={() => {
            if (naverRef.current && naverRef.current.children.length > 0) {
              const firstChild = naverRef.current.children[0] as HTMLElement;
              firstChild.click();
            }
          }}
        >
          <Image src={naver_btn_light} alt="네이버 로그인" className="oauthLogo" />
        </button>
      </div>
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