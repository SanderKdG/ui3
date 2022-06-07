import { Paper, Typography } from "@mui/material"
import { Formation, PlayerPosition } from "../../../domain/Formation"
import { SmallPlayerCardAsync } from "../PlayerCards/SmallPlayerCard"

export function SelectedPlayersList({formation, removePlayerFromFormation} : {formation : Formation, removePlayerFromFormation : ((p : PlayerPosition) => void)}) {
  return (
    <Paper sx={{width: "fit-content", m:1, padding: "0 10px", height: "fit-content", maxHeight: 600, overflowY: "auto"}}>
        <Typography variant="h5" sx={{m: 3, mb: 1}}>
          Selected Players <small>({formation.playerPositions.length})</small>
        </Typography>
        {formation.playerPositions
        .sort(function(a:PlayerPosition, b:PlayerPosition) {
          return b.position - a.position
        })
        .map((p : PlayerPosition) => (
          <div key={p.playerId} onClick={() => removePlayerFromFormation(p)} className="smallPlayerCardRemove">
            <SmallPlayerCardAsync id={p.playerId} />
          </div>
        ))}
    </Paper>
  )
}