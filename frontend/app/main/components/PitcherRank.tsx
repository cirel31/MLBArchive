"use client"
import {useEffect, useState} from "react";
import {fetchPitchingRankerDataAPI} from "@/app/redux/api/rankAPI";
import {AxiosResponse} from "axios";

const PitcherRank = () => {
  const [pitcher, setPitcher] = useState([])
  useEffect(() => {
    const response: Promise<AxiosResponse> = fetchPitchingRankerDataAPI()
    response
      .then((response) => {
        setPitcher(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <div>투수 순위</div>
      <div>
        {pitcher.length >= 5 ? 
          pitcher.map((content: any) => (
          <div key={content.id}>
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
