import {useState} from "react"
import {playerFilter, Player, sortPlayersOnAvg} from "../../../domain/Player"
import useGetCollection from "../../../hooks/useGetCollection"
import PlayerCard from "../../particles/PlayerCards/PlayerCard"
import {LoadingPlayerCard} from "../../particles/PlayerCards/PlayerCard"
import AddCard from "../../particles/AddCard"
import {ShowNoResultMessage} from "../../particles/ShowNoResultMessage";
import FilterField from "../../particles/FilterField";

export default function PlayersList() {
  const [filter, setFilter] = useState('')
  let {loading, data: players} = useGetCollection<Player>("/players/")
  let counter = 0
  if (loading) return (
    <div className="flexCards centerCards">
      {(Array.from({length: 20})).map(() => (
        <LoadingPlayerCard key={counter++}/>
      ))}
    </div>
  )
  const filteredList = players
    .filter((player: Player) => playerFilter(filter, player))
    .sort(sortPlayersOnAvg)
  return (<>
      <FilterField filter={filter} onChange={setFilter}/>
      <ShowNoResultMessage filterLength={filter.length} listLength={filteredList.length} lookingFor={"players"}/>
      <div className="flexCards centerCards">
        {
          filteredList
            .slice(0, 20)
            .map((player: Player) => (
              <PlayerCard key={player.id} player={player}/>
            ))
        }
        <AddCard to="/players/new"/>
      </div>
    </>
  )
}