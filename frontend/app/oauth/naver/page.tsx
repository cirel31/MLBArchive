'use client'
import {useEffect, useState} from "react";

const NaverLoginPage = () => {
  useEffect(() => {
    const oauthToken = window.location.hash.split("access_token=")[1]?.split("&")[0];
    console.log(oauthToken);
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = '';
  const subURL = '';

  return (
    <>
      <div>
        네이버 로그인 로직 진행 중
      </div>
    </>
  )
}

export default NaverLoginPage