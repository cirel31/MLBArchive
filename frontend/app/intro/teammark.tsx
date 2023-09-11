import React, { useEffect, useState, useCallback } from "react";
import gsap, { Power4 } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../../styles/intro.css";
import teammark from "../../assets/intro/Group 135.png";
import Image from "next/image";

function Intro() {
  gsap.registerPlugin(ScrollToPlugin);

  const [cardItems, setCardItems] = useState<HTMLElement[] | null>(
    Array.from(document.querySelectorAll(".cardItem"))
  );
  const [initialCardPositions, setInitialCardPositions] = useState<DOMRect[]>(
    []
  );
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  useEffect(() => {
    setCardItems(document.querySelectorAll(".cardItem"));
    cardSetting();
  }, []);

  useEffect(() => {
    // 초기 카드 위치를 저장
    if (cardItems) {
      const positions: DOMRect[] = [];
      cardItems.forEach(function (item) {
        const rect = item.getBoundingClientRect();
        positions.push(rect);
      });
      setInitialCardPositions(positions);
    }
  }, [cardItems]);

  const handleRandomButtonClick = useCallback(() => {
    console.log("랜덤 버튼이 클릭되었습니다.");

    if (cardItems) {
      cardItems.forEach(function (item, i) {
        gsap.to(item, {
          duration: 1,
          top: Math.random() * window.innerHeight,
          left: Math.random() * window.innerWidth,
          rotation: Math.random() * 180,
          ease: Power4.easeInOut,
          delay: i * 0.1,
        });
      });
    }
  }, []);

  const handleResetButtonClick = useCallback(() => {
    console.log("리셋 버튼이 클릭되었습니다.");

    if (cardItems && initialCardPositions.length === cardItems.length) {
      cardItems.forEach(function (item, i) {
        const initialPosition = initialCardPositions[i];
        gsap.to(item, {
          duration: 1,
          top: initialPosition.top,
          left: initialPosition.left,
          rotation: 0,
          ease: Power4.easeInOut,
          delay: i * 0.1,
        });
      });
    }
  }, [cardItems, initialCardPositions]);

  function cardSetting() {
    if (cardItems) {
      cardItems.forEach(function (item, i) {
        gsap.to(item, {
          duration: 1,
          top: windowHeight / 2 - i * 40,
          left: windowWidth / 2 + i * 40 - 200,
          rotation: 0,
          ease: Power4.easeInOut,
          delay: i * 0.2,
        });
      });
    }
  }

  return (
    <>
      <div>
        <section className="bottom2">
          <Image className="cardItem" src={teammark} alt="" />
          <Image className="cardItem" src={teammark} alt="" />
          <Image className="cardItem" src={teammark} alt="" />
          <Image className="cardItem" src={teammark} alt="" />
          <Image className="cardItem" src={teammark} alt="" />
          <Image className="cardItem" src={teammark} alt="" />
          <Image className="cardItem" src={teammark} alt="" />
        </section>
        <div className="buttonWrap">
          <button type="button" onClick={handleRandomButtonClick}>
            Random
          </button>
          <button type="button" onClick={handleResetButtonClick}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default Intro;
