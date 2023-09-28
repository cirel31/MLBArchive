import ArizonaDiamondbacks from "@/assets/teamlogo/ArizonaDiamondbacks.svg";
import AtlantaBraves from "@/assets/teamlogo/AtlantaBraves.svg";
import BaltimoreOrioles from "@/assets/teamlogo/BaltimoreOrioles.svg";
import BostonRedSox from "@/assets/teamlogo/BostonRedSox.svg";
import ChicagoCubs from "@/assets/teamlogo/ChicagoCubs.svg";
import ChicagoWhiteSox from "@/assets/teamlogo/ChicagoWhiteSox.svg";
import CincinnatiReds from "@/assets/teamlogo/CincinnatiReds.svg";
import ClevelandGuardians from "@/assets/teamlogo/ClevelandGuardians.svg";
import ColoradoRockies from "@/assets/teamlogo/ColoradoRockies.png";
import DetroitTigers from "@/assets/teamlogo/DetroitTigers.svg";
import HoustonAstros from "@/assets/teamlogo/HoustonAstros.svg";
import KansasCityRoyals from "@/assets/teamlogo/KansasCityRoyals.svg";
import LosAngelesAngels from "@/assets/teamlogo/LosAngelesAngels.svg";
import LosAngelesDodgers from "@/assets/teamlogo/LosAngelesDodgers.svg";
import MiamiMarlins from "@/assets/teamlogo/MiamiMarlins.svg";
import MilwaukeeBrewers from "@/assets/teamlogo/MilwaukeeBrewers.svg";
import MinnesotaTwins from "@/assets/teamlogo/MinnesotaTwins.svg";
import NewYorkMets from "@/assets/teamlogo/NewYorkMets.svg";
import NewYorkYankees from "@/assets/teamlogo/NewYorkYankees.svg";
import OaklandAs from "@/assets/teamlogo/OaklandA's.svg";
import PhiladelphiaPhillies from "@/assets/teamlogo/PhiladelphiaPhillies.svg";
import PittsburghPirates from "@/assets/teamlogo/PittsburghPirates.svg";
import SanDiegoPadres from "@/assets/teamlogo/SanDiegoPadres.svg";
import SanFranciscoGiants from "@/assets/teamlogo/SanFranciscoGiants.svg";
import SeattleMariners from "@/assets/teamlogo/SeattleMariners.svg";
import StLouisCardinals from "@/assets/teamlogo/St.LouisCardinals.svg";
import TampaBayRays from "@/assets/teamlogo/TampaBayRays.svg";
import TexasRangers from "@/assets/teamlogo/TexasRangers.svg";
import TorontoBlueJays from "@/assets/teamlogo/TorontoBlueJays.svg";
import WashingtonNationals from "@/assets/teamlogo/WashingtonNationals.svg";
import { StaticImageData } from "next/image";
import ABphoto from "@/assets/teamphoto/ABphoto.png";
import ADphoto from "@/assets/teamphoto/ADphoto.jpg";
import BOphoto from "@/assets/teamphoto/BOphoto.jpg";
import BRphoto from "@/assets/teamphoto/BRphoto.jpg";
import CCphoto from "@/assets/teamphoto/CCphoto.jpg";
import CGphoto from "@/assets/teamphoto/CGphoto.jpg";
import CRockiesphoto from "@/assets/teamphoto/CRockiesphoto.jpg";
import CRphoto from "@/assets/teamphoto/CRphoto.jpg";
import CWSphoto from "@/assets/teamphoto/CWSphoto.jpg";
import HAphoto from "@/assets/teamphoto/HAphoto.jpg";
import LAAphoto from "@/assets/teamphoto/LAAphoto.jpg";
import LADphoto from "@/assets/teamphoto/LADphoto.jpg";
import MBphoto from "@/assets/teamphoto/MBphoto.jpg";
import MMphoto from "@/assets/teamphoto/MMphoto.jpg";
import MTphoto from "@/assets/teamphoto/MTphoto.jpg";
import NYMphoto from "@/assets/teamphoto/NYMphoto.jpg";
import NYYphoto from "@/assets/teamphoto/NYYphoto.jpg";
import OAphoto from "@/assets/teamphoto/OAphoto.jpg";
import PPiratesphoto from "@/assets/teamphoto/PPiratesphoto.jpg";
import PPphoto from "@/assets/teamphoto/PPphoto.jpg";
import Royalsphoto from "@/assets/teamphoto/Royalsphoto.jpg";
import SDPphoto from "@/assets/teamphoto/SDPphoto.jpg";
import SFGphoto from "@/assets/teamphoto/SFGphoto.jpg";
import SLCphoto from "@/assets/teamphoto/SLCphoto.jpg";
import SMphoto from "@/assets/teamphoto/SMphoto.jpg";
import TBJphoto from "@/assets/teamphoto/TBJphoto.jpeg";
import TBRphoto from "@/assets/teamphoto/TBRphoto.jpg";
import Tigersphoto from "@/assets/teamphoto/Tigersphoto.jpg";
import TRphoto from "@/assets/teamphoto/TRphoto.jpg";
import WNphoto from "@/assets/teamphoto/WNphoto.jpg";

type TeamType = {
  id: number;
  name: string;
  linkName: string;
  logo: StaticImageData;
  rotationX: number;
  rotationY: number;
  twitter: string;
  team: StaticImageData;
};

export const teamData = [
  {
    id: 109,
    name: "Arizona Diamondbacks",
    linkName: "ArizonaDiamondbacks",
    logo: ArizonaDiamondbacks,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Dbacks",
    team: ADphoto,
  },
  {
    id: 144,
    name: "Atlanta Braves",
    linkName: "AtlantaBraves",
    logo: AtlantaBraves,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Braves",
    team: ABphoto,
  },
  {
    id: 110,
    name: "Baltimore Orioles",
    linkName: "BaltimoreOrioles",
    logo: BaltimoreOrioles,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Orioles",
    team: BOphoto,
  },
  {
    id: 111,
    name: "Boston Red Sox",
    linkName: "BostonRedSox",
    logo: BostonRedSox,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/redsox",
    team: BRphoto,
  },
  {
    id: 112,
    name: "Chicago Cubs",
    linkName: "ChicagoCubs",
    logo: ChicagoCubs,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Cubs",
    team: CCphoto,
  },
  {
    id: 145,
    name: "Chicago White Sox",
    linkName: "ChicagoWhiteSox",
    logo: ChicagoWhiteSox,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/whitesox",
    team: CWSphoto,
  },
  {
    id: 113,
    name: "Cincinnati Reds",
    linkName: "CincinnatiReds",
    logo: CincinnatiReds,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Reds",
    team: CRphoto,
  },
  {
    id: 114,
    name: "Cleveland Guardians",
    linkName: "ClevelandGuardians",
    logo: ClevelandGuardians,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/CLEGuardians",
    team: CGphoto,
  },
  {
    id: 115,
    name: "Colorado Rockies",
    linkName: "ColoradoRockies",
    logo: ColoradoRockies,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Rockies",
    team: CRockiesphoto,
  },
  {
    id: 116,
    name: "Detroit Tigers",
    linkName: "DetroitTigers",
    logo: DetroitTigers,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/tigers",
    team: Tigersphoto,
  },
  {
    id: 117,
    name: "Houston Astros",
    linkName: "HoustonAstros",
    logo: HoustonAstros,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/astros",
    team: HAphoto,
  },
  {
    id: 118,
    name: "Kansas City Royals",
    linkName: "KansasCityRoyals",
    logo: KansasCityRoyals,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/royals",
    team: Royalsphoto,
  },
  {
    id: 108,
    name: "Los Angeles Angels",
    linkName: "LosAngelesAngels",
    logo: LosAngelesAngels,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Angels",
    team: LAAphoto,
  },
  {
    id: 119,
    name: "Los Angeles Dodgers",
    linkName: "LosAngelesDodgers",
    logo: LosAngelesDodgers,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Dodgers",
    team: LADphoto,
  },
  {
    id: 146,
    name: "Miami Marlins",
    linkName: "MiamiMarlins",
    logo: MiamiMarlins,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Marlins",
    team: MMphoto,
  },
  {
    id: 158,
    name: "Milwaukee Brewers",
    linkName: "MilwaukeeBrewers",
    logo: MilwaukeeBrewers,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/brewers",
    team: MBphoto,
  },
  {
    id: 142,
    name: "Minnesota Twins",
    linkName: "MinnesotaTwins",
    logo: MinnesotaTwins,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Twins",
    team: MTphoto,
  },
  {
    id: 121,
    name: "New York Mets",
    linkName: "NewYorkMets",
    logo: NewYorkMets,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Mets",
    team: NYMphoto,
  },
  {
    id: 147,
    name: "New York Yankees",
    linkName: "NewYorkYankees",
    logo: NewYorkYankees,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Yankees",
    team: NYYphoto,
  },
  {
    id: 133,
    name: "Oakland Athletics",
    linkName: "OaklandAs",
    logo: OaklandAs,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Athletics",
    team: OAphoto,
  },
  {
    id: 143,
    name: "Philadelphia Phillies",
    linkName: "PhiladelphiaPhillies",
    logo: PhiladelphiaPhillies,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Phillies",
    team: PPphoto,
  },
  {
    id: 134,
    name: "Pittsburgh Pirates",
    linkName: "PittsburghPirates",
    logo: PittsburghPirates,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Pirates",
    team: PPiratesphoto,
  },
  {
    id: 135,
    name: "San Diego Padres",
    linkName: "SanDiegoPadres",
    logo: SanDiegoPadres,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/padres",
    team: SDPphoto,
  },
  {
    id: 137,
    name: "San Francisco Giants",
    linkName: "SanFranciscoGiants",
    logo: SanFranciscoGiants,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/SFGiants",
    team: SFGphoto,
  },
  {
    id: 136,
    name: "Seattle Mariners",
    linkName: "SeattleMariners",
    logo: SeattleMariners,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Mariners",
    team: SMphoto,
  },
  {
    id: 138,
    name: "St. Louis Cardinals",
    linkName: "StLouisCardinals",
    logo: StLouisCardinals,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Cardinals",
    team: SLCphoto,
  },
  {
    id: 139,
    name: "Tampa Bay Rays",
    linkName: "TampaBayRays",
    logo: TampaBayRays,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Raysbaseball",
    team: TBRphoto,
  },
  {
    id: 140,
    name: "Texas Rangers",
    linkName: "TexasRangers",
    logo: TexasRangers,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/rangers",
    team: TRphoto,
  },
  {
    id: 141,
    name: "Toronto Blue Jays",
    linkName: "TorontoBlueJays",
    logo: TorontoBlueJays,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Bluejays",
    team: TBJphoto,
  },
  {
    id: 120,
    name: "Washington Nationals",
    linkName: "WashingtonNationals",
    logo: WashingtonNationals,
    rotationX: 0,
    rotationY: 0,
    twitter: "https://twitter.com/Nationals",
    team: WNphoto,
  },
];

export const selectLogo = (id: number) => {
  const team = teamData.find((team) => team.id === id);
  return team ? team.logo : null;
};
export const selectTwitter = (id: number) => {
  const team = teamData.find((team) => team.id === id);
  return team ? team.twitter : "www.naver.com";
};

export const selectTeam = (id: number) => {
  const team = teamData.find((team) => team.id === id);
  return team ? team.team : null;
};
