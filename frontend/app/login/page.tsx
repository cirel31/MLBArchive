"use client";
import { useEffect, useRef, useState } from "react";
import "../../styles/LoginPageStyle.scss";
import Image from "next/image";
import kakao_btn from "../../assets/btn/kakao_btn_login.png";
import google_btn_dark from "../../assets/btn/google_btn_dark.png";
import naver_btn_light from "../../assets/btn/naver_btn_light.png";
import intro from "../../assets/intro/intro_pull.png";

import { useDispatch, useSelector } from "react-redux";
import { fetchReUserData } from "@/app/redux/features/userSlice";

import { Table, Typography, Carousel } from "antd";
const { Title } = Typography;

const LoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [STATE, SETSTATE] = useState("");
  const generateState = () => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < 20; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  };

  useEffect(() => {
    SETSTATE(generateState());
  }, []);

  const testData = useSelector((state: any) => state.user);

  const BASE_URL = process.env.NEXT_PUBLIC_CLIENT_BASE_URL;

  const API_KEY_KAKAO = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const REDIRECT_URI_KAKAO = process.env.NEXT_PUBLIC_OAUTH_KAKAO_URL;
  const OAUTH_KAKAO = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY_KAKAO}&redirect_uri=${BASE_URL}${REDIRECT_URI_KAKAO}&response_type=code&state=${STATE}`;

  const API_KEY_GOOGLE = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const REDIRECT_URI_GOOGLE = process.env.NEXT_PUBLIC_OAUTH_GOOGLE_URL;
  const OAUTH_GOOGLE = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${API_KEY_GOOGLE}&redirect_uri=${BASE_URL}${REDIRECT_URI_GOOGLE}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

  const API_KEY_NAVER = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const REDIRECT_URI_NAVER = process.env.NEXT_PUBLIC_OAUTH_NAVER_URL;
  const OAUTH_NAVER = `https://nid.naver.com/oauth2.0/authorize?client_id=${API_KEY_NAVER}&redirect_uri=${BASE_URL}${REDIRECT_URI_NAVER}&response_type=code&state=${STATE}`;

  setTimeout(function () {
    const loginContents = document.querySelector(".loginContents");
    if (loginContents) {
      loginContents.style.opacity = "1";
    }
  }, 300); // 5초 뒤에 실행

  const contentStyle: React.CSSProperties = {
    height: "100%",
    color: "#fff",
    // lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  return (
    <div>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://img.mlbstatic.com/mlb-images/image/upload/t_16x9/t_w2208/mlb/kxwcyq0fdgyidxtioowr.jpg"
              alt=""
              // style={{ width: "100%", height: "100%" }}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://img.mlbstatic.com/mlb-images/image/upload/t_16x9/t_w2208/mlb/zxifbvspc2hlnpzur3im.jpg"
              alt=""
              // style={{ width: "100%", height: "100%" }}
            />
          </h3>
        </div>
        <div>
          <h3 style={contentStyle}>
            <img
              src="https://img.mlbstatic.com/mlb-images/image/upload/t_16x9/t_w2208/mlb/s7akxdikqbeuraalsomc.jpg"
              alt=""
              // style={{ width: "100%", height: "100%" }}
            />
          </h3>
        </div>
      </Carousel>

      {/* <img
        src="https://img.mlbstatic.com/mlb-images/image/upload/t_16x9/t_w2208/mlb/kxwcyq0fdgyidxtioowr.jpg"
        className="logo"
        alt=""
      /> */}

      <div></div>
      <div className="loginContents">
        <Image src={intro} className="logo" alt="" />
        <p className="login_info">
          로그인을 해야 서비스를 이용할 수 있습니다 !
        </p>
        <a href={OAUTH_NAVER} className="loginItem">
          <Image
            src={naver_btn_light}
            alt="네이버 로그인"
            className="oauthLogo"
          />
        </a>
        <a href={OAUTH_KAKAO} className="loginItem">
          <Image src={kakao_btn} alt="카카오 로그인" className="oauthLogo" />
        </a>
        <a href={OAUTH_GOOGLE} className="loginItem">
          <Image
            src={google_btn_dark}
            alt="구글 로그인"
            className="oauthLogo"
          />
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
