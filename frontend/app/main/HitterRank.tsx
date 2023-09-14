"use client"
import {useEffect, useState} from "react";
import {fetchTodayMatchDataAPI} from "@/app/redux/api/rankAPI";
import {AxiosResponse} from "axios";

const HitterRank = () => {
  const [hitter, setHitter] = useState([])
  useEffect(() => {
    const response: Promise<AxiosResponse> = fetchTodayMatchDataAPI()
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
      <div>
        {hitter.length >= 5 && hitter.map((content: any) => (
          <div key={content.id}>
            {content.name}
          </div>
        ))}
      </div>
    </>
  )
}

export default HitterRank
