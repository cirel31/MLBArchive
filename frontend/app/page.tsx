"use client";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import "../styles/MainPageStyle.scss";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Intro from "../app/intro/page";
import {useDispatch, useSelector} from "react-redux";
import {fetchReUserData} from "@/app/redux/features/userSlice";

export default function Home() {
  const router = useRouter()
  const testData = useSelector((state:any) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(testData)
    dispatch(fetchReUserData())
  }, [])
  const handleLoginPage = () => {
    router.push('/login')
  }
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
      <div style={{ height: '1000px' }}>
        시작페이지
        <div style={{ height: '1000px' }}>Scroll content</div>
      </div>
    </main>
  )
}
