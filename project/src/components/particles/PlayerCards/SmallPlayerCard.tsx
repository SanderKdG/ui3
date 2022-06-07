import { Card, Box, CardContent, Typography, Skeleton } from "@mui/material";
import { Position } from "../../../domain/Formation";
import { Player, calculateAvg, calculateAge } from "../../../domain/Player"
import { useGetPlayer } from "../../../hooks/useGetSingle";

export function SmallPlayerCardAsync({id} : {id: number}) {
  const {loading, data: player, error } = useGetPlayer(`/players/${id}`)
  if(loading || error) return <LoadingSmallPlayerCard />
  return (
    <SmallPlayerCard player={player} />
  );
}

export function SmallPlayerCard({player} : {player: Player}) {
  return (
    <Card className="smallPlayerCard" sx={{ display:"flex",m:1 }}>
      <img
        src={player.image}
        alt={player.firstname + " " + player.lastname}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto', textAlign:"right" }}>
          <Typography component="div">
            {player.firstname + " " + player.lastname}
          </Typography>
          <Typography component="div" sx={{fontSize: 10}}>
            Avg: {calculateAvg(player.skills)}, Age: {calculateAge(player.birthDate)}
          </Typography>
          <Typography component="div" sx={{fontSize: 12}}>
            {player.positions.map(p => Position[p]).join(", ")}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export function LoadingSmallPlayerCard() {
  return (
    <Card className="smallPlayerCard" sx={{ display:"flex",m:1 }}>
      <Skeleton sx={{height: 80, width: 50, m: 1}} animation="wave" />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto', textAlign:"right" }}>
          <Typography component="div">
            <Skeleton animation="wave" sx={{width:100}} />
          </Typography>
          <Typography component="div" sx={{fontSize: 10}}>
            <Skeleton animation="wave" />
          </Typography>
          <Typography component="div" sx={{fontSize: 12}}>
            <Skeleton animation="wave" />
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}