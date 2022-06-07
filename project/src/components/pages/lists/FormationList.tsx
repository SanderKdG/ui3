import { Skeleton } from "@mui/material";
import { useState } from "react";
import {Formation, formationMatch} from "../../../domain/Formation";
import useGetCollection from "../../../hooks/useGetCollection"
import AddCard from "../../particles/AddCard";
import FormationCard, { LoadingFormationCard } from "../../particles/FormationCard";
import {ShowNoResultMessage} from "../../particles/ShowNoResultMessage";
import FilterField from "../../particles/FilterField";

export default function FormationList() {
  const { loading, data: formations } = useGetCollection<Formation>("/formations")
  if(loading) return <LoadingFormationCards />
  return <FormationCards formations={formations} />
}

function FormationCards({formations} : {formations : Formation[]}) {
  const [filter, setFilter] = useState<string>('')
  const filtered = formations.filter(f => formationMatch(f, filter))
  return(<>
    <FilterField filter={filter} onChange={setFilter}/>
    <ShowNoResultMessage listLength={filtered.length} lookingFor={"formations"} filterLength={filter.length} />
    <div className="flexCards centerCards">
      {filtered
      .map((f : Formation) => (
        <FormationCard key={f.id} formation={f} />
      ))}
      <AddCard to="/formations/new" />
    </div>
  </>)
}

function LoadingFormationCards() {
  let key = 0
  return(<>
    <Skeleton sx={{maxWidth: "78em", height: 80, m: "auto"}} />
    <div className="flexCards centerCards">
      {(Array.from({length: 16})).map(() => (
        <div key={key++}>
          <LoadingFormationCard />
        </div>
      ))}
    </div>
  </>);
}