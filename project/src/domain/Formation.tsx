export interface Formation {
  id: number | null;
  name: string;
  image: string;
  playerPositions: PlayerPosition[];
  likes: number;
}

export function defaultFormation() {
  return {
    id: null,
    name: "",
    image: "",
    playerPositions: [],
    likes: 0
  }
}

export interface PlayerPosition {
  playerId: number;
  position: Position;
}

export enum Position {
  'Unpositioned' = -1,
  'ST'= 0,
  'LW' = 1,
  'RW' = 2,
  'CAM' = 3,
  'LM' = 4,
  'CM' = 5,
  'RM' = 6,
  'CDM' = 7,
  'LB' = 8,
  'CB' = 9,
  'RB' = 10,
  'GK' = 11
}

export function getPositionKeys(): number[] {
  return Object.keys(Position).filter(k => Number.isInteger(+k)).map(k => Number.parseInt(k)) as number[];
}

export function getNumericFormation(playerPositions : PlayerPosition[]) {
  const attackers = playerPositions.filter(p => p.position === 0 || p.position === 1 || p.position === 2).length
  const cam = playerPositions.filter(p => p.position === 3).length
  const midfielders = playerPositions.filter(p => p.position === 4 || p.position === 5 || p.position === 6).length
  const cdm = playerPositions.filter(p => p.position === 7).length
  const defenders = playerPositions.filter(p => p.position === 8 || p.position === 9 || p.position === 10).length

  let value = ""
  if(defenders === 0) value += "*-"
  else value += defenders + "-"

  if(cdm > 0) value += cdm+"-"

  if(midfielders === 0) value += "*-"
  else value += midfielders + "-"

  if(cam > 0) value += cam+"-"

  if(attackers === 0) value += "*"
  else value += attackers

  
  return value.replace("*-*-","*-").replace("-*-*","-*").replace("*-*","*-*-*")
}

export function formationMatch(formation : Formation, filter : string) {
  if(formation.name.toLowerCase().includes(filter)) return true
  if(formation.image.toLowerCase().includes(filter)) return true
  return getNumericFormation(formation.playerPositions).includes(filter);
}

export function formationHasUnpositionedPlayers(formation : Formation) {
  return formationGetUnpositionedPlayers(formation).length > 0
}

export function formationGetUnpositionedPlayers(formation : Formation) {
  return formation.playerPositions.filter(pp => pp.position === -1)
}