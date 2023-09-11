import Link from "next/link";
import "../styles/MainPageStyle.scss";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mainphoto">
        <img
          src="https://img.mlbstatic.com/mlb-images/image/upload/t_16x9/t_w2208/mlb/xqq7yvk8nshiq4jvkmqq.jpg"
          alt=""
        />
      </div>

      <Link href={"/login"}>
        <div>로그인 페이지</div>
      </Link>
    </main>
  );
}
