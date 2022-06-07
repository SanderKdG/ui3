import {isImage} from "../functions/isImage";

export interface Club {
  id: number | null;
  name: string;
  shortName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
}

export function defaultClub() {
  return {
    id: null,
    name: "",
    shortName: "",
    logo: "",
    primaryColor: "#000000",
    secondaryColor: "#ffffff"
  }
}

export function validateClub(club : Club) {
  if(club.name.length === 0) throw Error("Club must have a name.")
  if(club.logo.length === 0) throw Error("Club must have a logo.")
  if(!isImage(club.logo)) throw Error("Club logo must be a valid image.")
  if(club.shortName.length !== 3) throw Error("Club must have a short name with a length of 3 characters.")
}

export function clubMatch(club:Club, filter:string) {
  const lowerFilter = filter.toLowerCase()
  if(club.shortName.toLowerCase().includes(lowerFilter)) return true
  if(club.name.toLowerCase().includes(lowerFilter)) return true
  if(club.logo.toLowerCase().includes(lowerFilter)) return true
  if(club.primaryColor.toLowerCase().includes(lowerFilter)) return true
  return club.secondaryColor.toLowerCase().includes(lowerFilter);
}