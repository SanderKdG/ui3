import {Club, clubMatch} from "../../../domain/Club";
import useGetCollection from "../../../hooks/useGetCollection";
import AddCard from "../../particles/AddCard";
import ClubCard, { LoadingClubCard } from "../../particles/ClubCard";
import {useState} from "react";
import FilterField from "../../particles/FilterField";
import {ShowNoResultMessage} from "../../particles/ShowNoResultMessage";

export default function ClubList() {
  const [filter, setFilter] = useState('')
  let {loading, data : clubs } = useGetCollection<Club>("/clubs/")
  let key = 0
  if(loading) return(
    <div className="flexCards centerCards">
      {(Array.from({length: 20})).map(() => (
        <div key={key++}>
          <LoadingClubCard />
        </div>
      ))}
    </div>
  );

  const filtered = clubs
    .filter(c => clubMatch(c, filter))
    .sort(function(a: Club, b:Club){
      return a.shortName.localeCompare(b.shortName)
    })

  return (<>
    <FilterField filter={filter} onChange={setFilter}/>
    <ShowNoResultMessage listLength={filtered.length} lookingFor={"clubs"} filterLength={filter.length} />
    <div className="flexCards centerCards">
      {filtered
      .map((c : Club) => (
        <div key={c.id}>
          <ClubCard club={c} />
        </div>
      ))}
      <AddCard to="/clubs/new" />
    </div>
</>)
}