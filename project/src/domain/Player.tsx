import { Position } from "./Formation";
import {isImage} from "../functions/isImage";

export interface Player {
  id: number | null;
  firstname: string;
  lastname: string;
  nationality: string;
  birthDate: string;
  image: string;
  weight: number;
  length: number;
  matchesPlayed: number;
  skills: PlayerSkill[];
  clubId: number | null;
  positions: Position[];
}

export function defaultPlayer() {
  return {
    id: null,
    firstname: "",
    lastname: "",
    nationality: "",
    birthDate: "2000-01-01",
    image: "",
    weight: 75,
    length: 175,
    matchesPlayed: 0,
    skills: [
      {category: 0, score: 60, importance: 0.5},
      {category: 1, score: 60, importance: 0.5},
      {category: 2, score: 60, importance: 0.5},
      {category: 3, score: 60, importance: 0.5},
      {category: 5, score: 60, importance: 0.5},
      {category: 4, score: 60, importance: 0.5}
    ],
    clubId: 1,
    positions: []
  }
}

export interface PlayerSkill {
  category: Category;
  score: number;
  importance: number;
}

export enum Category {
  'Pace', //0
  'Shooting', //1
  'Dribbling', //2
  'Defending', //3
  'Physical', //4
  'Passing', //5
  'Reflexes', //6
  'Diving', //7
  'Kicking', //8
  'Handling', //9
  'Positioning' //10
}


export function calculateAvg(skills : PlayerSkill[]) {
  let total = 0;
  let counter = 0;
  try {
    skills.forEach(s => {
      total += s.importance * s.score
      counter += s.importance
    })
  } catch (exception : any) {
    return -1
  }
  return Math.round(total/counter)
}

export function calculateEstimatedValue(player : Player) : number {
  try {
    const avg = calculateAvg(player.skills)
    const age = calculateAge(player.birthDate)
    if(avg === -1) return 0
    let value = 50000 * avg/5
    if(avg >= 70) {
      value += avg/5 * 150000
    }
    if(age < 30) {
      value *= 1-age/30
    } else {
      value *= (30/age)/10
    }
    if(player.matchesPlayed/50 > 0) {
      value *= 1+((player.matchesPlayed/50)/100)
    }
    value *= (1-(avg/100))*100
    if(value < 0) return 500
    if(value > 100000) {
      value = Math.round(value / 10000)*10000
    }
    if(value > 1000000) {
      value = Math.round(value / 100000)*100000
    }
    return Math.round(value)
  } catch (exception : any) {
    return 0
  }
}
export function sortPlayersOnAvg(first: Player, second : Player) {
  return calculateAvg(second.skills) - calculateAvg(first.skills)
}

export function getFullName(player : Player) {
  return `${player.firstname} ${player.lastname}`
}

export function getShortFullName(player : Player) {
  return `${player.firstname.charAt(0)}. ${player.lastname}`
}

export function calculateAge(givenDate : string) {
  const today = new Date();
  const birthDate = new Date(givenDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

export function playerFilter(filter : string, player : Player) {
  if(filter.length === 0) return true

  const useFilter = filter.toLowerCase()
  if(getFullName(player).toLowerCase().includes(useFilter)) return true
  if(player.nationality.toLowerCase().includes(useFilter)) return true
  return (calculateAvg(player.skills) + "").includes(useFilter);
}

export function validatePlayer(player : Player) {
  if(player.firstname.length <= 1) throw Error("Please fill in a proper first name")
  if(player.lastname.length <= 1) throw Error("Please fill in a proper last name")
  if(player.nationality.length <= 1) throw Error("Please fill in a proper nationality")
  if(player.birthDate.length <= 1) throw Error("Please fill in a proper birth date")
  if(!isImage(player.image)) throw Error("Please fill in a proper image")
  if(player.positions.length === 0) throw Error("A player must have at least one favorite position")
  if(player.clubId === null || !(player.clubId > 0)) throw Error("Every player must play at a club")
}