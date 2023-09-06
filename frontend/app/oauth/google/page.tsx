'use client'
import {useState} from "react";
const GoogleLoginPage = () => {
  const oauthToken = window.location.hash.split("access_token=")[1]?.split("&")[0];
  console.log(oauthToken);
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = '';
  const subURL = '';

  return (
    <>
      <div>
        구글 로그인 로직 진행 중
      </div>
    </>
  )
}

export default GoogleLoginPage