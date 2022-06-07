import {Button, Card, CardActions, CardContent, Grid, Skeleton, Typography} from "@mui/material";
import { Box } from "@mui/system";
import { useHistory, useParams } from "react-router";
import { Formation } from "../../../domain/Formation";
import { calculateEstimatedValue, Player } from "../../../domain/Player";
import useGetCollection from "../../../hooks/useGetCollection";
import { useGetPlayer } from "../../../hooks/useGetSingle";
import SimpleAlert from "../../particles/SimpleAlert";
import PlayerCard, {LoadingPlayerCard} from "../../particles/PlayerCards/PlayerCard";
import numberToCurrencyString from "../../../functions/numberToCurrencyString";

const headerStyle = {fontWeight:"bold"}

export default function PlayerDetails() {
  const { id } = useParams<{id: string}>()
  const { loading, data: player, error } = useGetPlayer("/players/"+id)
  if(error) return <SimpleAlert color="error">An error has occurred, could not load the player details.</SimpleAlert>
  if(loading) return <LoadingPlayerDetails/>
  return(
    <Box className="flexCards centerCards">
      <PlayerCard player={player} />
      <ExtraDetailCard player={player} />
    </Box>
  )
}

function ExtraDetailCard({player} : {player:Player}) {
  const history = useHistory()
  return (
    <Card sx={{m:1, height: "fit-content"}}>
      <CardContent>
        <Typography variant="h6">Details</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography sx={headerStyle}>Length</Typography>
            <Typography>{player.length/100}m</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={headerStyle}>Weight</Typography>
            <Typography>{player.weight}kg</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={headerStyle}>Date of birth</Typography>
            <Typography>{player.birthDate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={headerStyle}>Matches played</Typography>
            <Typography>{player.matchesPlayed}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={headerStyle}>Times selected</Typography>
            <GetSelectedFormationsCount player={player} />
          </Grid>
          <Grid item xs={6}>
            <Typography sx={headerStyle}>Estimated value</Typography>
            {numberToCurrencyString(calculateEstimatedValue(player))}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={() => history.push("/players/"+player.id+"/modify")}>Modify Player</Button>
      </CardActions>
    </Card>
  )
}

function GetSelectedFormationsCount({player} : {player: Player }) {
  const { loading, error, data } = useGetCollection<Formation>("/formations")
  if(loading) return <Skeleton />
  if(error || player.id === null) return <>-1</>
  try {
    const getFormations = data.filter(p => p.playerPositions.map(pp => pp.playerId).includes(player.id as number)).length
    return <>{getFormations}</>
  } catch(error : any) {
    console.log("An exception has occurred when trying to count all the formations the player is listed in. The error: "+error)
    return <>0</>
  }
}

function LoadingPlayerDetails() {
  let counter = 0
  return (<Box className="flexCards centerCards">
    <LoadingPlayerCard />
    <Card sx={{m:1, height: "fit-content", width: 700}}>
      <CardContent>
        <Typography variant="h6"><Skeleton sx={{width: 100}} /></Typography>
        <Grid container spacing={3}>
          {
            Array.from({length: 6}).map( () => (
              <Grid key={counter++} item xs={6}>
                <Typography sx={headerStyle}><Skeleton /></Typography>
                <Typography><Skeleton /></Typography>
              </Grid>
            ))
          }
        </Grid>
      </CardContent>
      <CardActions>
        <Skeleton sx={{height: 60, width: 200}} />
      </CardActions>
    </Card>
  </Box>)
}