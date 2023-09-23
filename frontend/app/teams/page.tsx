"use client";
import Image, { StaticImageData } from "next/image";
import "../../styles/TeamListPage.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
// import { fetchTeamDataRequest } from "@/app/redux/features/searchTeamSlice";
import { teamDetailData } from "@/app/redux/features/teamSlice";
import { teamData } from "@/app/components/team/teamData";

const TeamsPage = () => {
  const router = useRouter();
  const [teamList, setTeamList] = useState(teamData);
  const handleMouseMove = (
    id: number,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const div = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - (div.left + div.width / 2);
    const y = event.clientY - (div.top + div.height / 2);
    const degX = (y / div.height) * 90;
    const degY = -(x / div.width) * 90;

    setTeamList((prevTeamList) =>
      prevTeamList.map((team) => {
        if (team.id === id) {
          return { ...team, rotationX: degX, rotationY: degY };
        }
        return team;
      })
    );
  };
  const handleTouchMove = (
    id: number,
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    const div = event.currentTarget.getBoundingClientRect();
    const x = event.touches[0].clientX - (div.left + div.width / 2);
    const y = event.touches[0].clientY - (div.top + div.height / 2);
    const degX = (y / div.height) * 90;
    const degY = -(x / div.width) * 90;
    setTeamList((prevTeamList) =>
      prevTeamList.map((team) => {
        if (team.id === id) {
          return { ...team, rotationX: degX, rotationY: degY };
        }
        return team;
      })
    );
  };

  const handlePointerLeave = (id: number) => {
    const updatedTeams = teamList.map((team) =>
      team.id === id ? { ...team, rotationX: 0, rotationY: 0 } : team
    );
    setTeamList(updatedTeams);
  };
  const dispatch = useDispatch();
  const searchTeamData = (key: any) => {
    dispatch(teamDetailData(key));
    router.push(`/teams/${key}`);
  };
  return (
    <>
      <div className="teamList">
        {teamList.map((team) => (
          <div
            key={team.id}
            style={{
              transform: `rotateX(${team.rotationX}deg) rotateY(${team.rotationY}deg)`,
              transition: "transform 0.5s ease-out",
            }}
          >
            <div
              key={team.id}
              onMouseLeave={() => handlePointerLeave(team.id)}
              onTouchEnd={() => handlePointerLeave(team.id)}
              onMouseMove={(event) => handleMouseMove(team.id, event)}
              onTouchMove={(event) => handleTouchMove(team.id, event)}
            >
              <Image
                src={team.logo}
                alt={team.name}
                className="teamLogo"
                // onClick={() => router.push(`/teams/${team.linkName}`)}
                onClick={() => searchTeamData(team.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamsPage;
