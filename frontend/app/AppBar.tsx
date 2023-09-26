"use client";
import { useRouter } from "next/navigation";
import "../styles/AppBarStyle.scss";
import intro from "../assets/intro/intro.png";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserLogout} from "@/app/redux/features/userSlice";

const AppBar = () => {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn)
  const router = useRouter()
  const dispatch = useDispatch()
  const logoutBTN = () => {
    dispatch(fetchUserLogout())
    router.push('/login')
  }
  return (
    <>
      <div className="appbar">
        <Image className="mark" src={intro} alt="" />
        <button onClick={() => router.push("/")}>Home</button>
        <button onClick={() => router.push("/main")}>Main</button>
        <button onClick={() => router.push("/teams")}>teams</button>
        <button onClick={() => router.push("/players")}>players</button>
        {isLoggedIn
          ? <button onClick={() => logoutBTN()}>logout</button>
          : <button onClick={() => router.push("/login")}>login</button>
        }
      </div>
    </>
  );
};

export default AppBar