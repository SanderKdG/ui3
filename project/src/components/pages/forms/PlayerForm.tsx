import { Button, Paper, TextField, Typography, Autocomplete } from "@mui/material";
import { useState } from "react";
import {defaultPlayer, Player, validatePlayer} from "../../../domain/Player";
import useGetCollection from "../../../hooks/useGetCollection";
import SimpleAlert from "../../particles/SimpleAlert";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Club } from "../../../domain/Club";
import PlayerCard from "../../particles/PlayerCards/PlayerCard";
import { Box } from "@mui/system";
import { useHistory, useParams } from "react-router";
import getNationalities from "../../../functions/nationalities";
import { useGetPlayer } from "../../../hooks/useGetSingle";
import { deleteObject, postObject, putObject } from "../../../functions/objectService";
import {getPositionKeys, Position} from "../../../domain/Formation";
import {PlayerFormSliders} from "../../particles/PlayerFormParticles/PlayerFormSliders";

export function NewPlayerForm() {
  return <PlayerForm usePlayer={defaultPlayer()} />
}

export function ModifyPlayerForm() {
  const { id } = useParams<{id: string}>()
  const {loading, data, error} = useGetPlayer("/players/"+id)
  if(error) return <SimpleAlert color="error">An error has occurred, could not load the player details.</SimpleAlert>
  if(loading) return <SimpleAlert color="info">Loading the player details...</SimpleAlert>
  return <PlayerForm usePlayer={data} />
}

export function PlayerForm({usePlayer} : {usePlayer : Player}) {
  const history = useHistory()
  const [player, setPlayer] = useState<Player>(usePlayer)
  const [formError, setFormError] = useState<string>("")
  const { loading, data: clubs, error } = useGetCollection<Club>("/clubs")

  if(error) return <SimpleAlert color="error">An error has occurred, could not load the clubs.</SimpleAlert>
  if(loading) return <SimpleAlert color="info">Loading clubs...</SimpleAlert>
  if(clubs.length === 0) return <SimpleAlert color="warning">There are no clubs to assign to a player, please create a club first.</SimpleAlert>

  function handleChange(property: string, value: (string | Position[])) {
    //on field clear, value gets changed to "" instead of null
    if(property === "nationality" && value === "null") value = ""

    //if modifying position, order the list first
    if(property === "positions") value = (value as Position[]).sort((a, b) => {
      return a-b
    })

    setPlayer({...player, [property]: value})
  }

  async function submitForm() {
    try {
      validatePlayer(player)
      if(player.id === null) {
        if(!(await postObject<Player>("/players",player))) {
          setFormError("An error has occurred, could not add player.")
        } else {
          history.push("/players")
        }
      } else {
        if(!(await putObject(`/players/${player.id}`,player))) {
          setFormError("An error has occurred, could not update player.")
        } else {
          history.push(`/players/${player.id}`)
        }
      }
    } catch (exception) {
      setFormError("Attention! "+exception)
    }
  }

  async function removePlayer() {
    if(!(await deleteObject(`/players/${player.id}`))) {
      setFormError("An error has occurred, could not delete player.")
    } else {
      history.push("/players")
    }
  }

  const fieldOptions = {m: 1, width: "auto"}
  return(
    <>
      <SimpleAlert color="warning">{formError}</SimpleAlert>
      <Box sx={{flexWrap: "wrap", display: 'flex', alignItems: "normal"}}>
        <PlayerCard
          player={player} />
        <Paper sx={{m:1, p: 3, width: "fit-content", maxWidth: 400}}>
          <Typography variant="h5">
            New Player
          </Typography>
          <TextField sx={fieldOptions} label="Firstname" value={player.firstname} variant="standard" onChange={(event) => handleChange("firstname",event.target.value)} />
          <TextField sx={fieldOptions} label="Lastname" value={player.lastname} variant="standard" onChange={(event) => handleChange("lastname",event.target.value)} />
          <TextField type="number" sx={fieldOptions} label="Weight" value={player.weight} variant="standard" onChange={(event) => handleChange("weight",event.target.value)} />
          <TextField type="number" sx={fieldOptions} label="Length" value={player.length} variant="standard" onChange={(event) => handleChange("length",event.target.value)} />
          <TextField type="number" sx={fieldOptions} label="Matches played" value={player.matchesPlayed} variant="standard" onChange={(event) => handleChange("matchesPlayed",event.target.value)} />

          <Autocomplete
            onChange={(event, value) => handleChange("nationality",value+"")}
            sx={fieldOptions}
            value={player.nationality}
            options={getNationalities().map((e : {NationalityID : number, CountryCode : string, Nationality: string}) => e.Nationality)}
            renderInput={(params) => (
              <TextField {...params} label="Nationality" variant="standard" />
            )}
          />
          <TextField sx={fieldOptions} type="url" label="Image" value={player.image} variant="standard" onChange={(event) => handleChange("image",event.target.value)} />
          <TextField sx={fieldOptions} type="date" label="Date of birth" value={player.birthDate} variant="standard" onChange={(event) => handleChange("birthDate",event.target.value)} />
          <Autocomplete sx={fieldOptions}
            multiple
            onChange={(event, value) => handleChange("positions",value)}
            options={getPositionKeys().filter(p => p >= 0)}
            getOptionLabel={(option) => Position[option]}
            value={player.positions}
            renderInput={(params) => (
              <TextField {...params} label="Favorite Positions" variant="standard" placeholder="positions" />
            )}
          />
        <FormControl fullWidth>
          <InputLabel sx={{m: 0, p: 0, ml: -0.7, mt: 1.2}}>Club</InputLabel>
            <Select sx={fieldOptions}
              variant='standard'
              value={player.clubId+""}
              label="Club"
              onChange={(event) => handleChange("clubId",event.target.value)}
            >
              {clubs
              .map((club : Club) => (
                <MenuItem key={club.id} value={(club.id as number)}>{club.name} ({club.shortName})</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button sx={{m: 2}} onClick={submitForm} variant="contained" color={player.id === null ? "success" : "primary"}>{player.id === null ? "Add Player" : "Save Changes"}</Button>
          {player.id !== null ? <Button sx={{m: 2}} onClick={() => history.push("/players/"+player.id)} variant="contained" color="info">Details</Button> : "" }
          {player.id !== null ? <Button sx={{m: 2}} onClick={removePlayer} variant="contained" color="error">Delete player</Button> : "" }
        </Paper>
        <Box sx={{flexWrap: "wrap", display: 'flex'}}>
          <PlayerFormSliders player={player} setPlayer={setPlayer} />
        </Box>
      </Box>
    </>
  )
}