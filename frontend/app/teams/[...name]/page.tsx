'use client'
import {useEffect, useState} from "react";

const DetailTeamPage = () => {
  const [teamName, setTeamName] = useState('')
  useEffect(() => {
    const parsing = window.location.href.split("teams/")[1];
    setTeamName(parsing)
  }, []);

  return (
    <>
      <div>
        <p>{teamName}</p>
      </div>
    </>
  )
}

export default DetailTeamPage