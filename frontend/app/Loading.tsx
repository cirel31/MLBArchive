import React, { useState, useEffect } from "react";
import "../styles/Loading.css";
import logo from "../assets/intro/intro_pull.png";
import ball from "../assets/ball.png";
import Image from "next/image";

function Loading() {
  return (
    <>
      <Image src={ logo } alt="로고" />
      <Image src={ ball } alt="공" />
    </>
  );
}

export default Loading;
