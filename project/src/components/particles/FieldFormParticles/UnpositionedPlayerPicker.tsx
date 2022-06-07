import { Paper, Typography } from "@mui/material"
import {PlayerPosition, Formation} from "../../../domain/Formation"
import {Player, sortPlayersOnAvg} from "../../../domain/Player"
import { SmallPlayerCard } from "../PlayerCards/SmallPlayerCard"

type functionType<I,R> = (v : I) => R
interface UnpositionedPlayerPickerType {
  addToPosition : number,
  formation : Formation,
  players : Player[],
  modifyPlayerPosition : functionType<PlayerPosition, void>
}
export function UnpositionedPlayerPicker({addToPosition, players, formation, modifyPlayerPosition} : UnpositionedPlayerPickerType) {
  players = players
    .filter(
      p => p.id !== null
        && formation.playerPositions.filter(pp => pp.position === -1).map(pp => pp.playerId).includes(p.id)
    ).sort(sortPlayersOnAvg)
  if(players.length === 0) return <></>
  return (
    <Paper sx={{width: "fit-content", m:1, padding: "0 10px", height: "fit-content", maxHeight: 600, overflowY: "auto"}}>
      <Typography variant="h5" sx={{m: 3, mb: 1, textAlign: "center"}}>
        Unpositioned
      </Typography>
      {
        players
          .map((p : Player) => (
            <div key={p.id} className="smallPlayerCardAdd" onClick={() => modifyPlayerPosition({playerId: (p.id as number), position: addToPosition})}>
              <SmallPlayerCard player={p} />
            </div>
          ))
      }
    </Paper>
  )
}