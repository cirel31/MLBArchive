import React, { useState, useEffect, useRef } from "react";
import { gsap, Power3, Power4 } from "gsap"; // GSAP 라이브러리 가져오기
import Image from "next/image";
import teamcard from "../../assets/intro/Group 135.png";
import teamcard2 from "../../assets/intro/Group 137.png";
import teamcard3 from "../../assets/intro/Group 140.png";
import teamcard4 from "../../assets/intro/Group 141.png";
import teamcard5 from "../../assets/intro/Group 142.png";
import teamcard6 from "../../assets/intro/Group 143.png";
import teamcard7 from "../../assets/intro/Group 144.png";
import teamcard8 from "../../assets/intro/Group 145.png";
import teamcard9 from "../../assets/intro/Group 146.png";
import teamcard10 from "../../assets/intro/Group 147.png";
import teamcard11 from "../../assets/intro/Group 148.png";
import teamcard12 from "../../assets/intro/Group 149.png";
import teamcard13 from "../../assets/intro/Group 150.png";
import teamcard14 from "../../assets/intro/Group 151.png";
import "../../styles/intro.css";
import Link from "next/link";
import { Button } from "antd";

gsap.registerPlugin(gsap);

function CardComponent() {
  const [cards, setCards] = useState([]);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [scrolling, setScrolling] = useState(false); // 스크롤 중 여부

  // useRef 훅을 함수 컴포넌트 내에서 선언
  const initialPositions = useRef([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // window 객체가 정의되었을 때만 실행
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    }
    const _cards = document.querySelectorAll(".cardItem");

    const _button1 = document.querySelectorAll("button")[0];
    const _button2 = document.querySelectorAll("button")[1];

    _button1.addEventListener("click", cardRandom);
    // _button2.addEventListener("click", cardSetting);

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
  const elements = document.querySelectorAll(".title2 div");

  setTimeout(() => {
    elements.forEach(function (_text) {
      gsap.to(_text, {
        autoAlpha: 1,
        delay: Math.random() * 0.8,
        ease: Power3.easeInOut,
      });
    });
  }, 6000);

  return (
    // JSX로 컴포넌트 렌더링
    <div>
      <section className="bottom2">
        <div className="cardItem">
          <Image src={teamcard} alt="" />
        </div>
        <div className="cardItem">
          <Image src={teamcard2} alt="" />
        </div>
        <div className="cardItem">
          <Image src={teamcard3} alt="" />
        </div>
        <div className="cardItem">
          <Image src={teamcard4} alt="" />
        </div>
        <div className="cardItem">
          <Image src={teamcard5} alt="" />
        </div>
        <div className="cardItem">
          <Image src={teamcard6} alt="" />
        </div>
        <div className="cardItem">
          <Image src={teamcard7} alt="" />
        </div>
        <div className="cardItem">
          <Image src={teamcard8} alt="" />
        </div>
        <div className="cardItem">
          <Image src={teamcard9} alt="" />
        </div>
        <div className="cardItem">
          <Image src={teamcard10} alt="" />
        </div>
        <div className="cardItem">
          <Image src={teamcard11} alt="" />
        </div>
        <div className="cardItem">
          <Image src={teamcard12} alt="" />
        </div>
        <div className="cardItem">
          <Image src={teamcard13} alt="" />
        </div>
        <div className="cardItem">
          <Image src={teamcard14} alt="" />
        </div>
      </section>

      <div className="buttonWrap">
        <Button onClick={cardRandom}>카드 뿌리기</Button>
        {/* <button type="button" onClick={cardSetting}>
          Reset
        </button> */}

        <Link href="/main">
          <Button>
            <a>이동하기</a>
          </Button>
        </Link>

        <div className="bottom">
          <section className="bottom">
            <h1 className="title2">
              <div>원</div>
              <div>하</div>
              <div>는</div>

              <div>팀</div>
              <div>고</div>
              <div>르</div>
              <div>기</div>
              <h5>
                {" "}
                <div>이동하기 버튼을 클릭해 메인페이지로 이동하세요 !</div>
              </h5>
            </h1>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
