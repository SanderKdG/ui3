import "../../css/Field.css"
import { AddCircleOutline } from "@mui/icons-material"
import { Grid } from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import {Formation, formationHasUnpositionedPlayers, PlayerPosition} from "../../domain/Formation"
import { PlayerIconAsync } from "./PlayerCards/PlayerIcon"
import {GridSize} from "@mui/material/Grid";

export function Field({formation, setAddToPosition, showAddIcons} : {formation : Formation, showAddIcons : boolean, setAddToPosition : (v : number) => void}) {
  const heightFixValue = 20

  function GridFieldPosition({position, size, heightFix} : {position: number, size: GridSize, heightFix: number}) {
    return (
        <Grid className="fieldPosition" item xs={size} sx={{position:"relative", top:heightFix}} onClick={() => setAddToPosition(position)}>
          <GetCorrectPlayer showAddIcons={showAddIcons} formation={formation.playerPositions} position={position} />
        </Grid>
    )
  }

  return (<Box sx={{width: 450, m:1, background: `rgb(0,70,0, 60%)`, borderRadius: 1, height: "fit-content"}}>
    <Box className="field" sx={{width: "100%", height: 650}}>
      <Grid id="Forwards" className="fieldSection" container>
        <GridFieldPosition position={1} size={3} heightFix={heightFixValue} />
        <GridFieldPosition position={0} size={6} heightFix={0} />
        <GridFieldPosition position={2} size={3} heightFix={heightFixValue} />
      </Grid>
      <Grid id="AttackingMidfield" className="fieldSection" container>
        <GridFieldPosition position={3} size={12} heightFix={0} />
      </Grid>
      <Grid id="Midfield" className="fieldSection" container>
        <GridFieldPosition position={4} size={3} heightFix={0} />
        <GridFieldPosition position={5} size={6} heightFix={0} />
        <GridFieldPosition position={6} size={3} heightFix={0} />
      </Grid>
      <Grid id="DefendingMidfield" className="fieldSection" container>
        <GridFieldPosition position={7} size={12} heightFix={0} />
      </Grid>
      <Grid id="Defenders" className="fieldSection" container>
        <GridFieldPosition position={8} size={3} heightFix={-heightFixValue} />
        <GridFieldPosition position={9} size={6} heightFix={0} />
        <GridFieldPosition position={10} size={3} heightFix={-heightFixValue} />
      </Grid>
      <Grid id="Goalkeepers" className="fieldSection" container>
        <GridFieldPosition position={11} size={12} heightFix={0} />
      </Grid>
    </Box>
    {showAddIcons || formationHasUnpositionedPlayers(formation) ? (
      <Grid id="Unpositioned" className="fieldSection" container sx={{textAlign: "center", pb: 2, mt: 0}}>
        <GridFieldPosition position={-1} size={12} heightFix={20} />
      </Grid>
    ) : ""}
  </Box>)
}

function AddPlayerIcon() {
  return <AddCircleOutline className="addPlayerToField" sx={{fontSize: 40}} />
}

function GetCorrectPlayer({formation, position, showAddIcons} : { formation : PlayerPosition[], position: number, showAddIcons: boolean }) {
  const [hovering, setHovering] = useState(false)
  const filtered = formation.filter((e : PlayerPosition) => e.position === position).map(pp => pp.playerId)
  if(showAddIcons && (formation.length < 11 && filtered.length === 0)) return <AddPlayerIcon />
  if(filtered.length > 0) {
    return (<>
      <Grid container onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
        {filtered.map(playerId => (
          <Grid key={playerId} item sx={{m: "auto"}}>
            <PlayerIconAsync id={playerId} />
          </Grid>
        ))}
        {showAddIcons && (hovering && formation.length < 11) ? <AddPlayerIcon /> : "" }
      </Grid>
    </>)
  }
  return (<>
    {filtered.map(playerId => (
      <PlayerIconAsync key={playerId} id={playerId} />
    ))}
  </>)
}