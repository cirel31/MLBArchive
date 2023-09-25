"use client"
import {useEffect, useState} from "react";
import {fetchPitchingRankerDataAPI} from "@/app/redux/api/rankAPI";
import {useRouter} from "next/navigation";
interface PromiseResult {
  message: string,
  status: number,
  resultData: any,
}

const PitcherRank = () => {
  const [pitcher, setPitcher] = useState([])
  const router = useRouter()
  useEffect(() => {
    const response: Promise<PromiseResult> = fetchPitchingRankerDataAPI()
    response
      .then((response) => {
        console.log(response.resultData)
        setPitcher(response.resultData)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <div>투수 순위</div>
      <div>
        {pitcher?.length >= 5 ?
          pitcher.map((content: any, index) => (
          <div key={index} onClick={() => router.push(`/players/${content.playerId}`)}>
            <img src={content.image} alt="선수 이미지" />
            {content.name}
          </div>
        )) : 
          <p>받아온 투수 정보 없음</p>
        }
      </div>
    </>
  )
}

export default PitcherRank
