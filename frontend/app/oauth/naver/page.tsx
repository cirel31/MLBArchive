'use client'
import {useEffect, useState} from "react";
import axios from "axios";

const NaverLoginPage = () => {
  let code;
  if (typeof window !== 'undefined') {
    code = window.location.href.split("code=")[1]?.split("&")[0];
  }
  console.log(code)
  return (
    <>
      <div>
        네이버 로그인 로직 진행 중
      </div>
    </>
  )
}

export default NaverLoginPage