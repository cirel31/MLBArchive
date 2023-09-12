"use client";
import React, { useEffect } from "react";
import gsap, { Power3, Power4 } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../../styles/intro.css";
import sample_img from "../../assets/intro/mark.png";
import teammark from "../../assets/intro/Group 135.png";
import member_img from "../../assets/intro/Group 134.png";
import Image from "next/image";
import TeamMarks from "./teammark";

function Intro() {
  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
    const image = document.querySelector("img") as HTMLImageElement;
    const textElements = document.querySelectorAll(".title div");

    window.addEventListener("scroll", function () {
      const scroll = this.scrollY;

      if (image) {
        image.style.transform = `translateY(${scroll / 1.6}px)`;
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
        </div>
        <button type="button" className="topBtn">
          TOP
        </button>
      </section>
      <TeamMarks />
    </>
  );
}
export default Intro;
