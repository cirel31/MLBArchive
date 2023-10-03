import React, { useState, useEffect } from "react";
import "../styles/Loading.css";
import logo from "../assets/intro/intro_pull.png";
import ball from "../assets/ball.png";

function Loading() {
  return (
    <>
      <img src={{ logo }} alt="" />
      <img src={{ ball }} alt="" />
    </>
  );
}

export default Loading;
