"use client"
import {useEffect, useState} from "react";
import {fetchTeamRankDataAPI} from "@/app/redux/api/rankAPI";
import {AxiosResponse} from "axios";

const TeamRank = () => {
  const [teamList, setTeamList] = useState([])
  useEffect(() => {
    const response: Promise<AxiosResponse> = fetchTeamRankDataAPI()
    response
      .then((response) => {
        setTeamList(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <div>
        {teamList.length >= 5 ?
          teamList.map((content: any) => (
            <div key={content.id}>
              {content.name}
            </div>
          )) :
          <p>받아온 팀 정보 없음</p>
        }
      </div>
    </>
  )
}

export default TeamRank
