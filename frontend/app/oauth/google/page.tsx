'use client'
import {useState} from "react";
const GoogleLoginPage = () => {
  let code;
  if (typeof window !== 'undefined') {
    code = window.location.href.split("code=")[1]?.split("&")[0];
  }
  console.log(code)
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