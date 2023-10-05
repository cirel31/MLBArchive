import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "../styles/MainPageStyle.scss";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/main");
    }
  });
  const handleLoginPage = () => {
    router.push("/login");
  };
  return (
    <div>
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
      ></main>
    </div>
  );
}
