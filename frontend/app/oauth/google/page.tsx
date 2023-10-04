'use client'
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserData} from "@/app/redux/features/userSlice";
import {useRouter} from "next/navigation";
const GoogleLoginPage = () => {
  const router = useRouter()
  let code: string | null = null;
  let scope: string | null = null;
  let state: string | null = null;
  if (typeof window !== 'undefined') {
    code = window.location.href.split("code=")[1]?.split("&")[0];
    scope = window.location.href.split("scope=")[1]?.split("&")[0];
    state = window.location.href.split("state=")[1]?.split("&")[0];
  }
  console.log("code : ", code, "scope : ", scope)
  const dispatch = useDispatch()
  useEffect(() => {
    const accessKey = {
      code: code ?? "",
      state: state ?? "",
      kind: 'google',
    }
    dispatch(fetchUserData(accessKey))

  }, [code])
  const isLoggedIn = useSelector((state:any) => !!state.user?.isLoggedIn)
  const userId = useSelector((state:any) => state.user.userData?.userId)
  useEffect(() => {
    if (isLoggedIn) {
      router.push(`/user/mypage`)
    }
  }, [isLoggedIn])
  return (
    <>
      <div>
        구글 로그인 로직 진행 중
      </div>
    </>
  )
}

export default GoogleLoginPage