"use client"
import {useEffect} from "react";
import {fetchFollowData} from "@/app/redux/features/userSlice";
import {useDispatch} from "react-redux";

const LoginCheck = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchFollowData())
  }, [])
  return null
}

export default LoginCheck