'use client'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserData} from "@/app/redux/features/userSlice";
import {useRouter} from "next/navigation";
import Loading from "@/app/Loading";

const KakaoLoginPage = () => {
  const router = useRouter()
  let state: string | null = null;
  let code: string | null = null;
  if (typeof window !== 'undefined') {
    code = window.location.href.split("code=")[1]?.split("&")[0];
    state = window.location.href.split("state=")[1]?.split("&")[0];
  }
  const dispatch = useDispatch()
  useEffect(() => {
    if (code) {
      const accessKey = {
        code : code ?? "",
        state : state ?? "",
        kind: 'kakao',
      }
      dispatch(fetchUserData(accessKey))
    }
  }, [code])
  const isLoggedIn = useSelector((state:any) => !!state.user?.isLoggedIn)
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/main");
    }
  }, [isLoggedIn])
  return (
    <>
      <Loading />
    </>
  )
}

export default KakaoLoginPage