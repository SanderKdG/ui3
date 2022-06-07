import {defaultFormation, Formation, PlayerPosition, Position} from "../../../domain/Formation";
import {useState} from "react";
import {Player} from "../../../domain/Player";
import useGetCollection from "../../../hooks/useGetCollection";
import {useHistory, useParams} from "react-router";
import {useGetFormation} from "../../../hooks/useGetSingle";
import SimpleAlert from "../../particles/SimpleAlert";
import useMediaQuery from '@mui/material/useMediaQuery';
import {deleteObject, postObject, putObject} from "../../../functions/objectService";
import {isImage} from "../../../functions/isImage";
import {Field} from "../../particles/Field";
import {GeneralInfoFields} from "../../particles/FieldFormParticles/GeneralInfoFields";
import {SelectedPlayersList} from "../../particles/FieldFormParticles/SelectedPlayersList";
import {PlayerPicker} from "../../particles/FieldFormParticles/PlayerPicker";
import {UnpositionedPlayerPicker} from "../../particles/FieldFormParticles/UnpositionedPlayerPicker";

const defaultImage = "https://static.thenounproject.com/png/1542513-200.png"

export function EditableField({provideFormation}: { provideFormation: Formation }) {
  const {loading, data: players, error} = useGetCollection<Player>("/players")
  const [formation, setFormation] = useState(provideFormation)
  const [addToPosition, setAddToPosition] = useState<number | null>(null)
  const [formError, setFormError] = useState<string | null>()
  const [filter, setFilter] = useState<string>("")
  const history = useHistory()

  function removePlayerFromFormation(p: PlayerPosition) {
    let tempFormation = formation.playerPositions
    const index = tempFormation.indexOf(p);
    if (index > -1) {
      tempFormation.splice(index, 1)
    }
    setFormation({...formation, "playerPositions": tempFormation})
  }

  function addPlayerToFormation(p: PlayerPosition) {
    if (formation.playerPositions.length >= 11) {
      setAddToPosition(null)
      return
    }
    let tempFormation = formation.playerPositions
    tempFormation.push(p)
    setFormation({...formation, "playerPositions": tempFormation})
    setAddToPosition(null)
    setFilter("")
  }

  function modifyPlayerPosition(p: PlayerPosition) {
    let tempFormation = formation.playerPositions
    const index = tempFormation.findIndex(pp => pp.playerId === p.playerId)
    if (index > -1) {
      tempFormation.splice(index, 1)
    }
    tempFormation.push(p)
    setAddToPosition(null)
    setFormation({...formation, "playerPositions": tempFormation})
  }

  function handleSetAddToPosition(pos: number | null) {
    if (formation.playerPositions.length < 11 || formation.playerPositions.findIndex(pp => pp.position === -1) >= 0) {
      setAddToPosition(pos)
    }
  }

  function playerInFormation(id: number) {
    return formation.playerPositions.map((p: PlayerPosition) => p.playerId).indexOf(id) > -1
  }

  function playerPlaysPosition(positions: Position[]) {
    if (addToPosition != null) {
      return positions.indexOf((addToPosition as number)) > -1
    }
    return false;
  }

  function handleChange(property: string, value: (string | Position[])) {
    setFormation({...formation, [property]: value})
  }

  async function submitFormation() {
    if (formation.name.length === 0) return
    if (formation.image.length === 0) formation.image = defaultImage
    if (!isImage(formation.image)) return
    if (await pushChanges()) {
      history.push("/formations")
    } else {
      setFormError("An formError has occurred, your request has not been submitted.")
    }
  }

  async function pushChanges() {
    if (formation.id === null) {
      return await postObject<Formation>("/formations", formation)
    } else {
      return await putObject<Formation>(`/formations/${formation.id}`, formation)
    }
  }

  async function deleteFormation() {
    if (await deleteObject(`/formations/${formation.id}`)) {
      history.push("/formations")
    } else {
      setFormError("An formError has occurred, could not delete formation.")
    }
  }

  if (error) return <SimpleAlert color={"error"}>Could not load players. Our servers may have an outage or you have lost
    your connection.</SimpleAlert>
  if (loading) return <SimpleAlert color={"info"}>Loading players...</SimpleAlert>
  if (players.length === 0) return <SimpleAlert color={"warning"}>No players to select for the formation, please add
    some players first.</SimpleAlert>

  return (<>
    {formError != null ? <SimpleAlert color="error">{formError}</SimpleAlert> : ""}
    <SmallScreenWarning/>
    <GeneralInfoFields
      formation={formation}
      handleChange={handleChange}
      submitFormation={submitFormation}
      deleteFormation={deleteFormation}/>

    <Field showAddIcons={true} formation={formation} setAddToPosition={handleSetAddToPosition}/>

    {formation.playerPositions.length === 0 ? "" :
      <div>
        {!loading && addToPosition !== -1 && addToPosition !== null ? (
          <UnpositionedPlayerPicker addToPosition={addToPosition} formation={formation} players={players}
                                    modifyPlayerPosition={modifyPlayerPosition}/>
        ) : ""
        }
        <SelectedPlayersList formation={formation} removePlayerFromFormation={removePlayerFromFormation}/>
      </div>
    }

    {!loading && addToPosition !== null && formation.playerPositions.length < 11 ? (<>
      <PlayerPicker
        addToPosition={addToPosition}
        players={players}
        filter={filter}
        setFilter={setFilter}
        playerPlaysPosition={playerPlaysPosition}
        playerInFormation={playerInFormation}
        addPlayerToFormation={addPlayerToFormation}/>
    </>) : ""}
  </>)
}

export function NewFormationForm() {
  return (
    <div className="flexCards">
      <EditableField provideFormation={defaultFormation()}/>
    </div>
  )
}

export function ModifyFormationForm() {
  const {id} = useParams<{ id: string }>()
  const {loading, data: modifyFormation, error} = useGetFormation(`/formations/${id}`)
  if (error) return <SimpleAlert color="error">An error has occurred, we could not process your request.</SimpleAlert>
  if (loading) return <SimpleAlert color="info">We are loading the field for you...</SimpleAlert>
  return (
    <div className="flexCards">
      <EditableField provideFormation={modifyFormation}/>
    </div>
  )
}

function SmallScreenWarning() {
  const smallScreen = useMediaQuery('(max-width:600px)')

  if (smallScreen) return (
    <SimpleAlert color="info">
      We recommend you to use a bigger screen when creating or modifying a selection.
    </SimpleAlert>)
  else return <></>
}