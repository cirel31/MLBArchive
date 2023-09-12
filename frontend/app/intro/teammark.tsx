import React, { useState, useEffect } from "react";
import { gsap, Power3, Power4 } from "gsap"; // GSAP 라이브러리 가져오기
import Image from "next/image";
import teamcard from "../../assets/intro/Group 135.png";
import "../../styles/intro.css";

gsap.registerPlugin(gsap);

function CardComponent() {
  const [cards, setCards] = useState([]);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const _cards = document.querySelectorAll(".cardItem");

    const _button1 = document.querySelectorAll("button")[0];
    const _button2 = document.querySelectorAll("button")[1];

    _button1.addEventListener("click", cardRandom);
    _button2.addEventListener("click", cardSetting);

    window.addEventListener("resize", resize);

    // 페이지 로딩 시나 새로고침 시 카드 초기 위치 설정
    window.addEventListener("load", cardSetting);

    setCards(_cards);

    return () => {
      _button1.removeEventListener("click", cardRandom);
      _button2.removeEventListener("click", cardSetting);
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", cardSetting);
    };
  }, []);

  function resize() {
    // 창크기 변경시 업데이트
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
    cardSetting();
  }

  function cardSetting() {
    cards.forEach(function (item, i) {
      gsap.to(item, 1, {
        top: windowHeight / 2 - i * 40,
        left: windowWidth / 2 + i * 40 - 200,
        rotation: 0,
        ease: Power3.easeInOut,
        delay: i * 0.2,
      });
    });
  }

  function cardRandom() {
    cards.forEach(function (item, i) {
      gsap.to(item, 1, {
        top: Math.random() * windowHeight,
        left: Math.random() * windowWidth,
        rotation: Math.random() * 180,
        ease: Power4.easeInOut,
        delay: i * 0.1,
      });
      console.log("random");
    });
  }

  return (
    // JSX로 컴포넌트 렌더링
    <div>
      <div>
        <section className="bottom2">
          <div className="cardItem">
            <Image src={teamcard} alt="" />
          </div>
          <div className="cardItem">
            <Image src={teamcard} alt="" />
          </div>
          <div className="cardItem">
            <Image src={teamcard} alt="" />
          </div>
          <div className="cardItem">
            <Image src={teamcard} alt="" />
          </div>
          <div className="cardItem">
            <Image src={teamcard} alt="" />
          </div>
        </section>
        <div className="buttonWrap">
          <button type="button" onClick={cardRandom}>
            Random
          </button>
          <button type="button" onClick={cardSetting}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
