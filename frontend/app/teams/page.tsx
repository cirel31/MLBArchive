"use client";
import Image, { StaticImageData } from "next/image";
import "../../styles/TeamListPage.scss";
import ArizonaDiamondbacks from "../../assets/teamlogo/ArizonaDiamondbacks.svg";
import AtlantaBraves from "../../assets/teamlogo/AtlantaBraves.svg";
import BaltimoreOrioles from "../../assets/teamlogo/BaltimoreOrioles.svg";
import BostonRedSox from "../../assets/teamlogo/BostonRedSox.svg";
import ChicagoCubs from "../../assets/teamlogo/ChicagoCubs.svg";
import ChicagoWhiteSox from "../../assets/teamlogo/ChicagoWhiteSox.svg";
import CincinnatiReds from "../../assets/teamlogo/CincinnatiReds.svg";
import ClevelandGuardians from "../../assets/teamlogo/ClevelandGuardians.svg";
import ColoradoRockies from "../../assets/teamlogo/ColoradoRockies.png";
import DetroitTigers from "../../assets/teamlogo/DetroitTigers.svg";
import HoustonAstros from "../../assets/teamlogo/HoustonAstros.svg";
import KansasCityRoyals from "../../assets/teamlogo/KansasCityRoyals.svg";
import LosAngelesAngels from "../../assets/teamlogo/LosAngelesAngels.svg";
import LosAngelesDodgers from "../../assets/teamlogo/LosAngelesDodgers.svg";
import MiamiMarlins from "../../assets/teamlogo/MiamiMarlins.svg";
import MilwaukeeBrewers from "../../assets/teamlogo/MilwaukeeBrewers.svg";
import MinnesotaTwins from "../../assets/teamlogo/MinnesotaTwins.svg";
import NewYorkMets from "../../assets/teamlogo/NewYorkMets.svg";
import NewYorkYankees from "../../assets/teamlogo/NewYorkYankees.svg";
import OaklandAs from "../../assets/teamlogo/OaklandA's.svg";
import PhiladelphiaPhillies from "../../assets/teamlogo/PhiladelphiaPhillies.svg";
import PittsburghPirates from "../../assets/teamlogo/PittsburghPirates.svg";
import SanDiegoPadres from "../../assets/teamlogo/SanDiegoPadres.svg";
import SanFranciscoGiants from "../../assets/teamlogo/SanFranciscoGiants.svg";
import SeattleMariners from "../../assets/teamlogo/SeattleMariners.svg";
import StLouisCardinals from "../../assets/teamlogo/St.LouisCardinals.svg";
import TampaBayRays from "../../assets/teamlogo/TampaBayRays.svg";
import TexasRangers from "../../assets/teamlogo/TexasRangers.svg";
import TorontoBlueJays from "../../assets/teamlogo/TorontoBlueJays.svg";
import WashingtonNationals from "../../assets/teamlogo/WashingtonNationals.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchTeamDataRequest } from "@/app/redux/features/searchTeamSlice";

const TeamsPage = () => {
  const router = useRouter();
  type TeamType = {
    id: number;
    name: string;
    logo: StaticImageData;
    rotationX: number;
    rotationY: number;
  };

  const [teamList, setTeamList] = useState<TeamType[]>([
    {
      id: 1,
      name: "ArizonaDiamondbacks",
      logo: ArizonaDiamondbacks,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 2,
      name: "AtlantaBraves",
      logo: AtlantaBraves,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 3,
      name: "BaltimoreOrioles",
      logo: BaltimoreOrioles,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 4,
      name: "BostonRedSox",
      logo: BostonRedSox,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 5,
      name: "ChicagoCubs",
      logo: ChicagoCubs,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 6,
      name: "ChicagoWhiteSox",
      logo: ChicagoWhiteSox,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 7,
      name: "CincinnatiReds",
      logo: CincinnatiReds,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 8,
      name: "ClevelandGuardians",
      logo: ClevelandGuardians,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 9,
      name: "ColoradoRockies",
      logo: ColoradoRockies,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 10,
      name: "DetroitTigers",
      logo: DetroitTigers,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 11,
      name: "HoustonAstros",
      logo: HoustonAstros,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 12,
      name: "KansasCityRoyals",
      logo: KansasCityRoyals,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 13,
      name: "LosAngelesAngels",
      logo: LosAngelesAngels,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 14,
      name: "LosAngelesDodgers",
      logo: LosAngelesDodgers,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 15,
      name: "MiamiMarlins",
      logo: MiamiMarlins,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 16,
      name: "MilwaukeeBrewers",
      logo: MilwaukeeBrewers,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 17,
      name: "MinnesotaTwins",
      logo: MinnesotaTwins,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 18,
      name: "NewYorkMets",
      logo: NewYorkMets,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 19,
      name: "NewYorkYankees",
      logo: NewYorkYankees,
      rotationX: 0,
      rotationY: 0,
    },
    { id: 20, name: "OaklandAs", logo: OaklandAs, rotationX: 0, rotationY: 0 },
    {
      id: 21,
      name: "PhiladelphiaPhillies",
      logo: PhiladelphiaPhillies,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 22,
      name: "PittsburghPirates",
      logo: PittsburghPirates,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 23,
      name: "SanDiegoPadres",
      logo: SanDiegoPadres,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 24,
      name: "SanFranciscoGiants",
      logo: SanFranciscoGiants,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 25,
      name: "SeattleMariners",
      logo: SeattleMariners,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 26,
      name: "StLouisCardinals",
      logo: StLouisCardinals,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 27,
      name: "TampaBayRays",
      logo: TampaBayRays,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 28,
      name: "TexasRangers",
      logo: TexasRangers,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 29,
      name: "TorontoBlueJays",
      logo: TorontoBlueJays,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 30,
      name: "WashingtonNationals",
      logo: WashingtonNationals,
      rotationX: 0,
      rotationY: 0,
    },
  ]);
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

  const searchTeamData = (key: any) => {
    // dispatch(fetchTeamDataRequest(key));
    // router.push(`/teams/${key}`)
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
                onClick={() => router.push(`/teams/${team.name}`)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamsPage;
