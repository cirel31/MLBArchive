"use client"
import {useEffect, useState} from "react";
import {fetchHittingRankerDataAPI} from "@/app/redux/api/rankAPI";
import {AxiosResponse} from "axios";

const HitterRank = () => {
  const [hitter, setHitter] = useState([])
  useEffect(() => {
    const response: Promise<AxiosResponse> = fetchHittingRankerDataAPI()
    response
      .then((response) => {
        setHitter(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <div>타자 순위</div>
      <div>
        {hitter.length >= 5 ?
          hitter.map((content: any) => (
            <div key={content.id}>
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
