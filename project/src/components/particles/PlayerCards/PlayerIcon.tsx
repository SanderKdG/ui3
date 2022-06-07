import { Avatar, Skeleton, Tooltip, Typography } from "@mui/material";
import {calculateAvg, getShortFullName, Player} from "../../../domain/Player";
import { useGetPlayer } from "../../../hooks/useGetSingle";

const sx = {width: 50, height: 50}

export function PlayerIcon({player} : {player: Player}) {
  const playerInfo = getShortFullName(player)
  return (<>
    <Tooltip title={playerInfo}>
      <Avatar
        alt={playerInfo}
        src={player.image}
        className="playerIcon"
        sx={sx}
      />
    </Tooltip>
    <Typography sx={{fontWeight: "bold", color: "white", fontSize: 10}}>{calculateAvg(player.skills)}</Typography>
  </>)
}

export function PlayerIconAsync({id} : {id: number}) {
  let {loading, data : player, error } = useGetPlayer("/players/"+id)
  if(loading || error) return (<LoadingPlayerIcon/>)
  return <PlayerIcon player={player} />
}

function LoadingPlayerIcon() {
  return (
  <>
    <Skeleton className="playerIcon" animation="wave" variant="circular" sx={sx} />
    <Skeleton className="playerIcon" animation="wave" sx={{width: 30}} />
  </>
  )
}