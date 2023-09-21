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
    linkName: string;
    logo: StaticImageData;
    rotationX: number;
    rotationY: number;
  };

  const [teamList, setTeamList] = useState<TeamType[]>([
    {
      id: 109,
      name: "Arizona Diamondbacks",
      linkName: "ArizonaDiamondbacks",
      logo: ArizonaDiamondbacks,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 144,
      name: "Atlanta Braves",
      linkName: "AtlantaBraves",
      logo: AtlantaBraves,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 110,
      name: "Baltimore Orioles",
      linkName: "BaltimoreOrioles",
      logo: BaltimoreOrioles,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 111,
      name: "Boston Red Sox",
      linkName: "BostonRedSox",
      logo: BostonRedSox,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 112,
      name: "Chicago Cubs",
      linkName: "ChicagoCubs",
      logo: ChicagoCubs,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 145,
      name: "Chicago White Sox",
      linkName: "ChicagoWhiteSox",
      logo: ChicagoWhiteSox,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 113,
      name: "Cincinnati Reds",
      linkName: "CincinnatiReds",
      logo: CincinnatiReds,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 114,
      name:  "Cleveland Guardians",
      linkName: "ClevelandGuardians",
      logo: ClevelandGuardians,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 115,
      name: "Colorado Rockies",
      linkName: "ColoradoRockies",
      logo: ColoradoRockies,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 116,
      name: "Detroit Tigers",
      linkName: "DetroitTigers",
      logo: DetroitTigers,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 117,
      name: "Houston Astros",
      linkName: "HoustonAstros",
      logo: HoustonAstros,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 118,
      name: "Kansas City Royals",
      linkName: "KansasCityRoyals",
      logo: KansasCityRoyals,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 108,
      name: "Los Angeles Angels",
      linkName: "LosAngelesAngels",
      logo: LosAngelesAngels,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 119,
      name: "Los Angeles Dodgers",
      linkName: "LosAngelesDodgers",
      logo: LosAngelesDodgers,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 146,
      name: "Miami Marlins",
      linkName: "MiamiMarlins",
      logo: MiamiMarlins,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 158,
      name : "Milwaukee Brewers",
      linkName: "MilwaukeeBrewers",
      logo: MilwaukeeBrewers,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 142,
      name: "Minnesota Twins",
      linkName: "MinnesotaTwins",
      logo: MinnesotaTwins,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 121,
      name: "New York Mets",
      linkName: "NewYorkMets",
      logo: NewYorkMets,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 147,
      name: "New York Yankees",
      linkName: "NewYorkYankees",
      logo: NewYorkYankees,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 133,
      name: "Oakland Athletics",
      linkName: "OaklandAs",
      logo: OaklandAs,
      rotationX: 0,
      rotationY: 0 },
    {
      id: 143,
      name: "Philadelphia Phillies",
      linkName: "PhiladelphiaPhillies",
      logo: PhiladelphiaPhillies,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 134,
      name: "Pittsburgh Pirates",
      linkName: "PittsburghPirates",
      logo: PittsburghPirates,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 135,
      name: "San Diego Padres",
      linkName: "SanDiegoPadres",
      logo: SanDiegoPadres,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 137,
      name:  "San Francisco Giants" ,
      linkName: "SanFranciscoGiants",
      logo: SanFranciscoGiants,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 136,
      name:  "Seattle Mariners",
      linkName: "SeattleMariners",
      logo: SeattleMariners,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 138,
      name: "St. Louis Cardinals",
      linkName: "StLouisCardinals",
      logo: StLouisCardinals,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 139,
      name:  "Tampa Bay Rays",
      linkName: "TampaBayRays",
      logo: TampaBayRays,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 140,
      name: "Texas Rangers",
      linkName: "TexasRangers",
      logo: TexasRangers,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 141,
      name: "Toronto Blue Jays",
      linkName: "TorontoBlueJays",
      logo: TorontoBlueJays,
      rotationX: 0,
      rotationY: 0,
    },
    {
      id: 120,
      name: "Washington Nationals",
      linkName: "WashingtonNationals",
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
                onClick={() => router.push(`/teams/${team.linkName}`)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamsPage;
