"use client"
import {useEffect, useState} from "react";
import {fetchHittingRankerDataAPI} from "@/app/redux/api/rankAPI";
import {useRouter} from "next/navigation";


interface PromiseResult {
  message: string,
  status: number,
  resultData: any,
}

const HitterRank = () => {
  const [hitter, setHitter] = useState([])
  const router = useRouter()

  useEffect(() => {
    const response: Promise<PromiseResult> = fetchHittingRankerDataAPI()
    console.log(response)
    response
      .then((response) => {
        setHitter(response.resultData)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <div>타자 순위</div>
      <div>
        {hitter?.length >= 5 ?
          hitter.map((content: any, index) => (
            <div key={index} onClick={() => router.push(`/players/${content.playerId}`)}>
              <img src={content.image} alt="선수 이미지" />
              {content.name}
            </div>
          )) :
          <p>받아온 타자 정보 없음</p>
        }
      </div>
    </>
  )
}

export default HitterRank
