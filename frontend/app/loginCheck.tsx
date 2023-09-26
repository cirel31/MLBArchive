"use client"
import {useEffect} from "react";
import {fetchFollowData, fetchReUserData} from "@/app/redux/features/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/navigation";

const LoginCheck = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state:any) => state.user.isLoggedIn)
  const router = useRouter()
  useEffect(() => {
    const token = sessionStorage.getItem("refreshToken") ?? null
    if (token && !isLoggedIn) {
      dispatch(fetchReUserData())
      dispatch(fetchFollowData())
    }
    if (!token && !isLoggedIn) {
      router.push('/login')
      console.log(isLoggedIn, "로그인 상태 Fail")
    }
  }, [isLoggedIn])
  return null
}

export default LoginCheck