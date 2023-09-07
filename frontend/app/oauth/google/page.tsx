'use client'
import {useEffect, useState} from "react";
const GoogleLoginPage = () => {
  let code;
  if (typeof window !== 'undefined') {
    code = window.location.href.split("code=")[1]?.split("&")[0];
  }
  console.log(code)
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   if (code) {
  //     dispatch(fetchUserData(code))
  //   }
  // }, [code])
  return (
    <>
      <div>
        구글 로그인 로직 진행 중
      </div>
    </>
  )
}

export default GoogleLoginPage