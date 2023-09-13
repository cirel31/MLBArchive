"use client";
import { useRouter } from "next/navigation";
import "../styles/MainPageStyle.scss";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);
export default function Home() {
  return (
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
      <div style={{ height: "1000px" }}>
        시작페이지
        <div style={{ height: "1000px" }}>Scroll content</div>
      </div>
    </main>
  );
}
