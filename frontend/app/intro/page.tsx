"use client";
import React, { useEffect } from "react";
import gsap, { Power3, Power4 } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../../styles/intro.css";
import sample_img from "../../assets/intro/mark.png";
import teammark from "../../assets/intro/Group 135.png";
import member_img from "../../assets/intro/Group 134.png";
import Image from "next/image";
import TeamMarks from "@/app/intro/teammark";

function Intro() {
  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
    const cards = document.querySelectorAll(".cardItem");
    const cardItems = Array.from(cards);

    const image = document.querySelector("img") as HTMLImageElement;
    const topBtn = document.querySelector(".topBtn") as HTMLButtonElement;
    const textElements = document.querySelectorAll(".title div");
    // const cards = document.querySelectorAll(
    //   ".cardItem"
    // ) as NodeListOf<HTMLElement>;
    const button1 = document.querySelectorAll("button")[0] as HTMLButtonElement;
    const button2 = document.querySelectorAll("button")[1] as HTMLButtonElement;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    window.addEventListener("scroll", function () {
      resize();
      const scroll = this.scrollY;

      if (image) {
        image.style.transform = `translateY(${scroll / 1.6}px)`;
      }

      const bottom2 = document.querySelector(".bottom2") as HTMLElement;
      const bottom2Rect = bottom2.getBoundingClientRect();

      if (scroll + window.innerHeight >= bottom2Rect.top) {
        cardSetting(windowHeight, windowWidth);
      }
    });

    setTimeout(() => {
      textElements.forEach(function (_text) {
        gsap.to(_text, {
          autoAlpha: 1,
          delay: Math.random() * 0.8,
          ease: Power3.easeInOut,
        });
      });
    }, 3000);

    gsap.to(window, 2, {
      scrollTo: ".bottom",
      delay: 1.5,
      ease: Power4.easeInOut,
    });

    gsap.to(window, 2, {
      scrollTo: ".bottom2",
      delay: 5.5,
      ease: Power4.easeInOut,
    });

    gsap.from(".bottom", 2.5, {
      scale: 0.7,
      y: 100,
      delay: 2.2,
      ease: Power4.easeInOut,
    });

    // topBtn.addEventListener("click", function () {
    //   gsap.to(window, 1, {
    //     scrollTo: {
    //       y: 0,
    //       autoKill: true,
    //     },
    //     ease: Power4.easeInOut,
    //   });
    // });

    button1.addEventListener("click", function (event) {
      cardRandom(windowHeight, windowWidth);
    });

    button2.addEventListener("click", function (event) {
      cardSetting(windowHeight, windowWidth);
    });

    window.addEventListener("resize", function () {
      resize();
    });

    function resize() {
      cardSetting(windowHeight, windowWidth);
    }

    function cardSetting(windowHeight: number, windowWidth: number) {
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

    function cardRandom(windowHeight: number, windowWidth: number) {
      cardItems.forEach(function (item, i) {
        gsap.to(item, 1, {
          top: Math.random() * windowHeight,
          left: Math.random() * windowWidth,
          rotation: Math.random() * 180,
          ease: Power4.easeInOut,
          delay: i * 0.1,
        });
      });
    }
  }, []); // useEffect의 두 번째 인자로 빈 배열을 전달하여 한 번만 실행되도록 설정

  return (
    <>
      <div className="starBg"></div>
      <section className="top">
        <Image src={sample_img} className="title" alt="엑박" />
      </section>

      <section className="bottom">
        <h1 className="title">
          <div>직</div>
          <div>접</div>
          <div>선</div>
          <div>수</div>
          <div>선</div>
          <div>택</div>
        </h1>
        <div className="contWrap">
          <ul>
            <li>
              <Image src={member_img} alt="" priority={true} />
            </li>
            <li>
              <Image src={member_img} alt="" priority={true} />
            </li>{" "}
            <li>
              <Image src={member_img} alt="" priority={true} />
            </li>{" "}
            <li>
              <Image src={member_img} alt="" priority={true} />
            </li>
          </ul>
          <ul>
            <li>
              <Image src={member_img} alt="" priority={true} />
            </li>{" "}
            <li>
              <Image src={member_img} alt="" priority={true} />
            </li>{" "}
            <li>
              <Image src={member_img} alt="" priority={true} />
            </li>{" "}
            <li>
              <Image src={member_img} alt="" priority={true} />
            </li>
          </ul>
          <h2>잘됐을까</h2>
        </div>
        <button type="button" className="topBtn">
          TOP
        </button>
      </section>
      {/* <div>
        <section className="bottom2">
          <div className="cardItem">
            <Image src={teammark} alt="" priority={true} />
          </div>
          <div className="cardItem">
            <Image src={teammark} alt="" priority={true} />
          </div>
          <div className="cardItem">
            <Image src={teammark} alt="" priority={true} />
          </div>
          <div className="cardItem">
            <Image src={teammark} alt="" priority={true} />
          </div>
          <div className="cardItem">
            <Image src={teammark} alt="" priority={true} />
          </div>
          <div className="cardItem">
            <Image src={teammark} alt="" priority={true} />
          </div>
          <div className="cardItem">
            <Image src={teammark} alt="" priority={true} />
          </div>
        </section>
        <div className="buttonWrap">
          <button type="button">Random</button>
          <button type="button">Reset</button>
        </div>
      </div> */}
      <TeamMarks />
    </>
  );
}
export default Intro;
