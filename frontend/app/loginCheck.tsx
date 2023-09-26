"use client"
import {useEffect} from "react";
import {fetchFollowData, fetchReUserData} from "@/app/redux/features/userSlice";
import {useDispatch} from "react-redux";

const LoginCheck = () => {
  const dispatch = useDispatch()
  const token = sessionStorage.getItem("refreshToken") ?? null
  useEffect(() => {
    if (token) {
      dispatch(fetchReUserData())
      dispatch(fetchFollowData())
    }
  }, [])
  return null
}

export default LoginCheck