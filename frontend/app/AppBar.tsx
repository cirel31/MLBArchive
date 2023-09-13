"use client";
import { useRouter } from "next/navigation";
import "../styles/AppBarStyle.scss";
import intro from "../assets/intro/intro.png";
import Image from "next/image";

const AppBar = () => {
  const router = useRouter();

  return (
    <>
      <div className="appbar">
        <Image className="mark" src={intro} alt="" />
        <button onClick={() => router.push("/")}>Home</button>
        <button onClick={() => router.push("/teams")}>teams</button>
        <button onClick={() => router.push("/players")}>players</button>
        <button onClick={() => router.push("/login")}>login</button>
      </div>
    </>
  );
};

export default AppBar;
