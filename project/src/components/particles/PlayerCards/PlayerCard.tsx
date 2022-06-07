import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Divider, Skeleton } from '@mui/material';
import {Player, calculateAvg, Category, calculateAge, getFullName} from '../../../domain/Player';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Position } from '../../../domain/Formation';
import { useGetClub, useGetPlayer } from '../../../hooks/useGetSingle';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function PlayerCard({player} : {player : Player}) {
  const {loading, data : club, error } = useGetClub("/clubs/"+player.clubId)
  let routerLink = "/players"
  if(player.id !== null) routerLink = "/players/"+player.id
  return (
    <Card sx={{ width: 300, textAlign: 'center', m: 1, height: 'fit-content'}}>
      <CardActionArea component={Link} to={routerLink}>
        {
          player.image.length > 1 ? <CardMedia
          component="img"
          height="300"
          image={player.image}
          alt={getFullName(player)}
        /> : <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
        }
        <CardContent>
          <Typography sx={{ fontSize: 14, pt: 0, mb: 0 }} color="text.secondary" gutterBottom>
          {player.nationality.length > 0 ? player.nationality : <SkeletonSmall />} - {loading || error ? <SkeletonSmall /> : club.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div" sx={{m: 0, p: 0}}>
           <strong>{calculateAvg(player.skills)}</strong>
           {bull}
            <small>
            {player.firstname.length > 0 ? player.firstname : <SkeletonSmall />}
            {" "}
            {player.lastname.length > 0 ? player.lastname : <SkeletonSmall />}
            </small>
           <Typography gutterBottom component="span" sx={{ fontSize: 12, p: "0 5px" }} color="text.secondary">
              ({calculateAge(player.birthDate)})
           </Typography>
          </Typography>
          <Typography gutterBottom variant="h5" component="div" sx={{m: 1, p: 0, fontSize: 18}}>
          {player.positions.map(p => Position[p]).join(" ")}
          </Typography>
          <Divider/>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            {player.skills.map(e => (
              <Grid key={e.category} item xs={4}>
                {Category[e.category].toUpperCase().slice(0,3)} {e.score}
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export function PlayerCardAsync({id} : {id : number}) {
  let {loading: loadingPlayer, data : player } = useGetPlayer("/players/"+id)
  if(loadingPlayer) return <LoadingPlayerCard />

  return (
      <PlayerCard player={player} />
  )
}

function SkeletonSmall() {
  return <Skeleton sx={{width: 60, display: "inline-block", m: 0.5}} />
}

export function LoadingPlayerCard() {
  return (
    <Card sx={{ width: 300, textAlign: 'center', m: 1, height: 'fit-content' }}>
      <CardActionArea>
        <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
        <CardContent>
          <Typography sx={{ fontSize: 14, pt: 0, mb: 0 }} color="text.secondary" gutterBottom>
            <Skeleton />
          </Typography>
          <Typography gutterBottom variant="h5" component="div" sx={{m: 0, p: 0}}>
            <Skeleton />
          </Typography>
          <Typography gutterBottom variant="h5" component="div" sx={{m: 1, p: 0, fontSize: 18}}>
            <Skeleton />
          </Typography>
          <Divider/>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            {([1, 2, 3, 4, 5, 6]).map(e => (
              <Grid key={e} item xs={4}>
                <Skeleton />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
