import { Paper, TextField, Typography } from "@mui/material"
import { Position, PlayerPosition } from "../../../domain/Formation"
import {Player, playerFilter, sortPlayersOnAvg} from "../../../domain/Player"
import { SmallPlayerCard } from "../PlayerCards/SmallPlayerCard"

type functionType<I,R> = (v : I) => R
interface PositionPickerType {
  addToPosition : number,
  players : Player[],
  filter : string,
  setFilter : functionType<string, void>,
  playerPlaysPosition : functionType<Position[], boolean>,
  playerInFormation : functionType<number, boolean>,
  addPlayerToFormation : functionType<PlayerPosition, void>
}
export function PlayerPicker({addToPosition, players, filter, setFilter, playerPlaysPosition, playerInFormation, addPlayerToFormation} : PositionPickerType) {
  if(filter !== "") {
    players = players.filter(p => !playerInFormation(p.id as number) && playerFilter(filter, p)).sort(sortPlayersOnAvg)
  } else if(addToPosition === -1) {
    players = players.filter(p => !playerInFormation((p.id as number))).sort(sortPlayersOnAvg)
  } else {
    players = players.filter(p => playerPlaysPosition(p.positions) && !playerInFormation((p.id as number))).sort(sortPlayersOnAvg)
  }
  return (
    <Paper sx={{width: "fit-content", m:1, padding: "0 10px", height: "fit-content", maxHeight: 600, overflowY: "auto"}}>
        <Typography variant="h5" sx={{m: 3, mb: 1, textAlign: "center"}}>
        Modifying {Position[addToPosition]}
        </Typography>
        <TextField
        sx={{m: 1, width: "95%"}}
          label="Search"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          variant="standard"
        />
        {
          players.length > 0 ?
            (players
              .map((p : Player) => (
                <div key={p.id} className="smallPlayerCardAdd" onClick={() => addPlayerToFormation({playerId: (p.id as number), position: addToPosition})}>
                  <SmallPlayerCard player={p} />
                </div>
              )))
          :
            <Typography sx={{p: 2}}>No players found..</Typography>
        }
      </Paper>
  )
}