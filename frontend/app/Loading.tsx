import React, { useState, useEffect } from "react";
import "../styles/Loading.css";
import logo from "../assets/intro/intro_pull.png";
import ball from "../assets/ball.png";
import Image from "next/image";

function Loading() {
  return (
    <div className="spinning">
      <Image className="spin" src={ball} alt="공" />
      <div className="text_loading">Loading . . .</div>
    </div>
  );
}

export default Loading;
