"use client";
import {useRouter} from "next/navigation";
import "../styles/MainPageStyle.scss";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Intro from "../app/intro/page";
gsap.registerPlugin(ScrollToPlugin);
export default function Home() {
  const router = useRouter()

  const handleLoginPage = () => {
    router.push("/login");
  };

  return (
    <div
    // style={{
    //   background: "linear-gradient(to bottom, #05074b 10%,#ffffff 100%)",
    // }}
    >
      <Intro />
      <main
        className="flex min-h-screen flex-col items-center justify-between p-24"
        style={{
          height: "100px",
          overflow: "auto",
        }}
        onClick={() => handleLoginPage()}
        onScroll={() => {
          console.log("Scrolled");
          handleLoginPage();
        }}
      >
        {/* <div style={{ height: "1000px" }}>
          시작페이지
          <div style={{ height: "1000px" }}>Scroll content</div>
        </div> */}
      </main>
    </div>
  );
}
