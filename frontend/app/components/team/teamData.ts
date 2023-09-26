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
import {StaticImageData} from "next/image";

type TeamType = {
  id: number;
  name: string;
  linkName: string;
  logo: StaticImageData;
  rotationX: number;
  rotationY: number;
  twitter: string;
};

export const teamData = [
  {
    id: 109,
    name: "Arizona Diamondbacks",
    linkName: "ArizonaDiamondbacks",
    logo: ArizonaDiamondbacks,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Dbacks',
  },
  {
    id: 144,
    name: "Atlanta Braves",
    linkName: "AtlantaBraves",
    logo: AtlantaBraves,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Braves',
  },
  {
    id: 110,
    name: "Baltimore Orioles",
    linkName: "BaltimoreOrioles",
    logo: BaltimoreOrioles,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Orioles',
  },
  {
    id: 111,
    name: "Boston Red Sox",
    linkName: "BostonRedSox",
    logo: BostonRedSox,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/redsox',
  },
  {
    id: 112,
    name: "Chicago Cubs",
    linkName: "ChicagoCubs",
    logo: ChicagoCubs,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Cubs',
  },
  {
    id: 145,
    name: "Chicago White Sox",
    linkName: "ChicagoWhiteSox",
    logo: ChicagoWhiteSox,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/whitesox',
  },
  {
    id: 113,
    name: "Cincinnati Reds",
    linkName: "CincinnatiReds",
    logo: CincinnatiReds,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Reds',
  },
  {
    id: 114,
    name:  "Cleveland Guardians",
    linkName: "ClevelandGuardians",
    logo: ClevelandGuardians,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/CLEGuardians',
  },
  {
    id: 115,
    name: "Colorado Rockies",
    linkName: "ColoradoRockies",
    logo: ColoradoRockies,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Rockies',
  },
  {
    id: 116,
    name: "Detroit Tigers",
    linkName: "DetroitTigers",
    logo: DetroitTigers,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/tigers',
  },
  {
    id: 117,
    name: "Houston Astros",
    linkName: "HoustonAstros",
    logo: HoustonAstros,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/astros',
  },
  {
    id: 118,
    name: "Kansas City Royals",
    linkName: "KansasCityRoyals",
    logo: KansasCityRoyals,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/royals',
  },
  {
    id: 108,
    name: "Los Angeles Angels",
    linkName: "LosAngelesAngels",
    logo: LosAngelesAngels,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Angels',
  },
  {
    id: 119,
    name: "Los Angeles Dodgers",
    linkName: "LosAngelesDodgers",
    logo: LosAngelesDodgers,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Dodgers',
  },
  {
    id: 146,
    name: "Miami Marlins",
    linkName: "MiamiMarlins",
    logo: MiamiMarlins,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Marlins',
  },
  {
    id: 158,
    name : "Milwaukee Brewers",
    linkName: "MilwaukeeBrewers",
    logo: MilwaukeeBrewers,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/brewers',
  },
  {
    id: 142,
    name: "Minnesota Twins",
    linkName: "MinnesotaTwins",
    logo: MinnesotaTwins,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Twins',
  },
  {
    id: 121,
    name: "New York Mets",
    linkName: "NewYorkMets",
    logo: NewYorkMets,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Mets',
  },
  {
    id: 147,
    name: "New York Yankees",
    linkName: "NewYorkYankees",
    logo: NewYorkYankees,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Yankees',
  },
  {
    id: 133,
    name: "Oakland Athletics",
    linkName: "OaklandAs",
    logo: OaklandAs,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Athletics',
  },
  {
    id: 143,
    name: "Philadelphia Phillies",
    linkName: "PhiladelphiaPhillies",
    logo: PhiladelphiaPhillies,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Phillies',
  },
  {
    id: 134,
    name: "Pittsburgh Pirates",
    linkName: "PittsburghPirates",
    logo: PittsburghPirates,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Pirates',
  },
  {
    id: 135,
    name: "San Diego Padres",
    linkName: "SanDiegoPadres",
    logo: SanDiegoPadres,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/padres',
  },
  {
    id: 137,
    name:  "San Francisco Giants" ,
    linkName: "SanFranciscoGiants",
    logo: SanFranciscoGiants,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/SFGiants',
  },
  {
    id: 136,
    name:  "Seattle Mariners",
    linkName: "SeattleMariners",
    logo: SeattleMariners,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Mariners',
  },
  {
    id: 138,
    name: "St. Louis Cardinals",
    linkName: "StLouisCardinals",
    logo: StLouisCardinals,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Cardinals',
  },
  {
    id: 139,
    name:  "Tampa Bay Rays",
    linkName: "TampaBayRays",
    logo: TampaBayRays,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Raysbaseball',
  },
  {
    id: 140,
    name: "Texas Rangers",
    linkName: "TexasRangers",
    logo: TexasRangers,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/rangers',
  },
  {
    id: 141,
    name: "Toronto Blue Jays",
    linkName: "TorontoBlueJays",
    logo: TorontoBlueJays,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Bluejays',
  },
  {
    id: 120,
    name: "Washington Nationals",
    linkName: "WashingtonNationals",
    logo: WashingtonNationals,
    rotationX: 0,
    rotationY: 0,
    twitter: 'https://twitter.com/Nationals',
  },
]

export const selectLogo = (id:number) => {
  const team = teamData.find(team => team.id === id)
  return team ? team.logo : null
}
export const selectTwitter = (id:number) => {
  const team = teamData.find(team => team.id === id)
  return team ? team.twitter : 'www.naver.com'
}