'use client'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchPlayerDetailData} from "@/app/redux/features/playerDetailSlice";
import {useRouter, usePathname } from "next/navigation";


const PlayerDetailPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const pathURI = usePathname()
  const playerInfo = useSelector((state:any) => state.playerDetail.playerData)
  useEffect(() => {
    dispatch(fetchPlayerDetailData(parseInt(pathURI.slice(9))))
  }, [])

  return (
    <>
      <p>{parseInt(pathURI.slice(9))}</p>
    </>
  )
}

export default PlayerDetailPage