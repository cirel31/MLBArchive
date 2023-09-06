'use client'
import {useState} from "react";

const NaverLoginPage = () => {
  const code = window.location.href.split("code=")[1]?.split("&")[0]
  console.log(code)
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