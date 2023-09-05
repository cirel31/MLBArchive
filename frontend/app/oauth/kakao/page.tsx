'use client'
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import axios from "axios";

const KakaoLoginPage = () => {

  const params = useSearchParams()
  const paramString = params.toString();
  const oauthToken = paramString.slice(5);
  console.log(oauthToken)
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = '';
  const subURL = '';
  useEffect(() => {
    axios.get(`${baseURL}${subURL}?code=${oauthToken}`)
      .then
  })
  return (
    <>
      <div>
        카카오 로그인 로직 진행 중
      </div>
    </>
  )
}

export default KakaoLoginPage