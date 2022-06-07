import { Button, Typography } from "@mui/material"
import { useHistory, useParams } from "react-router"
import { Player, sortPlayersOnAvg } from "../../../domain/Player"
import useGetCollection from "../../../hooks/useGetCollection"
import { useGetClub } from "../../../hooks/useGetSingle"
import SimpleAlert from "../../particles/SimpleAlert"
import ClubCard, { LoadingClubCard } from "../../particles/ClubCard"
import PlayerCard, { LoadingPlayerCard } from "../../particles/PlayerCards/PlayerCard"
import { Club } from "../../../domain/Club"

export default function ClubDetails() {
  const history = useHistory()
  const { id } = useParams<{id: string}>()
  const { loading, error, data: club } = useGetClub("/clubs/"+id)
  if(error) return <SimpleAlert color="error">An error has occurred, please try again later.</SimpleAlert>
  if(loading) return <div className="flexCards centerCards"><LoadingClubCard /></div>
  return (<>
    <div className="flexCards centerCards">
      <ClubCard club={club} />
      <div>
        <Button sx={{m: 2}} onClick={() => history.push("/clubs/"+id+"/modify")} variant="contained" color="primary">Modify</Button>
      </div>
    </div>
    <PlayersFromClub club={club} />
  </>)
}

function PlayersFromClub({club} : {club : Club}) {
  const { loading, error, data: players } = useGetCollection<Player>("/clubs/"+club.id+"/players")
  if(error) return <SimpleAlert color="error">An error has occurred, please try again later.</SimpleAlert>
  let counter = 0
  if(loading) return(
    <div className="flexCards centerCards">
      {(Array.from({length: 20})).map(() => (
        <LoadingPlayerCard key={counter++} />
      ))}
    </div>
  )
  return(<>
    { players.length > 0 ? <Typography sx={{textAlign: "center", mt:3, color: "default.main"}} variant="h4">Players of {club.name}</Typography> : "" }
    <div className="flexCards centerCards">
      {
        players
          .sort(sortPlayersOnAvg)
          .map(p => (<PlayerCard key={p.id} player={p} />))}
    </div>
    </>
  )
}