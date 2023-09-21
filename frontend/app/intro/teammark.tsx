import React, { useState, useEffect, useRef } from "react";
import { gsap, Power3, Power4 } from "gsap"; // GSAP 라이브러리 가져오기
import Image from "next/image";
import teamcard from "../../assets/intro/Group 135.png";
import "../../styles/intro.css";
import { Tween } from "react-gsap";

gsap.registerPlugin(gsap);

function CardComponent() {
  const [cards, setCards] = useState([]);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [scrolling, setScrolling] = useState(false); // 스크롤 중 여부

  // useRef 훅을 함수 컴포넌트 내에서 선언
  const initialPositions = useRef([]);

  useEffect(() => {
    const _cards = document.querySelectorAll(".cardItem");

    const _button1 = document.querySelectorAll("button")[0];
    const _button2 = document.querySelectorAll("button")[1];

    _button1.addEventListener("click", cardRandom);
    _button2.addEventListener("click", cardSetting);

    window.addEventListener("resize", () => {
      // 스크롤 중인 경우 창 크기 변경을 하지 않음
      if (!scrolling) {
        const newHeight = window.innerHeight;
        const newWidth = window.innerWidth;

        if (newHeight !== windowHeight || newWidth !== windowWidth) {
          setWindowHeight(newHeight);
          setWindowWidth(newWidth);
          cardSetting();
        }
      }
    });

    // 페이지 로딩 시나 새로고침 시 카드 초기 위치 설정
    window.addEventListener("load", () => {
      cardSetting();
      saveInitialPositions(); // 초기 위치 저장
    });

    setCards(_cards);

    return () => {
      _button1.removeEventListener("click", cardRandom);
      _button2.removeEventListener("click", cardSetting);
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", cardSetting);
    };
  }, []);

  function resize() {
    // 스크롤 중인 경우 창 크기 변경을 하지 않음
    if (!scrolling) {
      const newHeight = window.innerHeight;
      const newWidth = window.innerWidth;

      if (newHeight !== windowHeight || newWidth !== windowWidth) {
        setWindowHeight(newHeight);
        setWindowWidth(newWidth);
        cardSetting();
      }
    }
  }

  function cardSetting() {
    cards.forEach(function (item, i) {
      const top = windowHeight / 2 + i * 40;
      const left = windowWidth / 2 + i * 40 - 200;
      // const top = -windowWidth / 2 - 100;
      // const left = windowWidth / 2;
      const rotation = 0;

      gsap.to(item, 1, {
        top,
        left,
        rotation,
        ease: Power3.easeInOut,
        delay: i * 0.2,
      });
    });
  }

  function cardRandom() {
    // 스크롤 이벤트를 임시로 비활성화
    setScrolling(true);

    cards.forEach(function (item, i) {
      gsap.to(item, 1, {
        top: Math.random() * windowHeight,
        left: Math.random() * windowWidth,
        rotation: Math.random() * 180,
        ease: Power4.easeInOut,
        delay: i * 0.1,
        onComplete: () => {
          setScrolling(false);
        },
      });
      console.log("random");
    });
  }

  // 카드의 초기 위치 저장 함수
  function saveInitialPositions() {
    initialPositions.current = Array.from(cards).map((item) => ({
      top: parseFloat(item.style.top),
      left: parseFloat(item.style.left),
    }));
  }

  return (
    // JSX로 컴포넌트 렌더링
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
        <div className="bottom">
          <h1 className="title">
            <div>원</div>
            <div>하</div>
            <div>는</div>
            <div>팀</div>
            <div>정</div>
            <div>보</div>
            <div>확</div>
            <div>인</div>
          </h1>
        </div>
      </div>
      <section className="bottom3"></section>
    </div>
  );
}

export default CardComponent;
