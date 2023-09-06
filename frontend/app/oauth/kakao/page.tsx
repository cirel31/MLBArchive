'use client'
import {useState} from "react";
import axios from "axios";

const KakaoLoginPage = () => {
  const code = window.location.href.split("code=")[1]?.split("&")[0]
  console.log(code)
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = '';
  const subURL = '';
  // useEffect(() => {
  //   axios.get(`${baseURL}${subURL}?code=${oauthToken}`)
  //     .then
  // })
  return (
    <>
      <div>
        카카오 로그인 로직 진행 중
      </div>
    </>
  )
}

export default KakaoLoginPage