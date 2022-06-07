import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import {Club, defaultClub, validateClub} from "../../../domain/Club";
import { deleteObject, postObject, putObject } from "../../../functions/objectService";
import { useGetClub } from "../../../hooks/useGetSingle";
import SimpleAlert from "../../particles/SimpleAlert";

export function ClubForm({club} : {club:Club}) {
  const history = useHistory()
  const [data, setData] = useState<Club>(club)
  const [error, setError] = useState<string>("")

  async function handleSubmit() {
    try {
      validateClub(data)

      if(await sendRequest()){
        history.push("/clubs")
      } else {
        setError("An error has occurred, your request has not been submitted.")
      }
    } catch (exception: any) {
      setError("Attention! "+exception)
    }
  }

  async function deleteClub() {
    if(await deleteObject(`/clubs/${club.id}`)) {
      history.push("/clubs")
    } else {
      setError("An error has occurred, we couldn't delete the club for you.")
    }
  }

  function handleChange(property: string, value: string) {
    setData({...data, [property]: value})
  }

  async function sendRequest() {
    if(data.id == null) {
      return await postObject<Club>(`/clubs`, data)
    } else {
      return await putObject<Club>(`/clubs/${data.id}`, data)
    }
  }

  const fieldOptions = {m: 1, width: "100%"}
  return (<>
    <SimpleAlert color="error">{error}</SimpleAlert>
    <Box className="flexCards centerCards">
      <Paper sx={{m:1, p: 3, width: "fit-content", maxWidth: 500}}>
        <Typography variant="h5">
          {club.id === null ? "New" : "Modify"} Club
        </Typography>
        <TextField sx={fieldOptions} label="Name" value={data.name} variant="standard" onChange={(event) => handleChange("name",event.target.value)} />
        <TextField sx={fieldOptions} label="Short name" value={data.shortName} variant="standard" onChange={(event) => handleChange("shortName",event.target.value)} />
        <TextField sx={fieldOptions} label="Logo" value={data.logo} variant="standard" onChange={(event) => handleChange("logo",event.target.value)} />
        <TextField type="color" sx={fieldOptions} label="Primary color" value={data.primaryColor} variant="standard" onChange={(event) => handleChange("primaryColor",event.target.value)} />
        <TextField type="color" sx={fieldOptions} label="Secondary color" value={data.secondaryColor} variant="standard" onChange={(event) => handleChange("secondaryColor",event.target.value)} />
        <Button variant="contained" onClick={handleSubmit} color={club.id === null ? "success" : "primary"} sx={{m: 2}}>{club.id === null ? "Add Club" : "Save Changes"}</Button>
        {club.id !== null ? <Button variant="contained" onClick={deleteClub} color="error" sx={{m: 2}}>Delete Club</Button> : ""}
      </Paper>
    </Box>
  </>)
}

export function NewClub() {
  return <ClubForm club={defaultClub()} />
}

export function ModifyClub() {
  const { id } = useParams<{id: string}>()
  const { loading, data, error } = useGetClub("/clubs/"+id)
  if(error) return <SimpleAlert color="error">An error has occurred, we could not process your request.</SimpleAlert>
  if(loading) return <SimpleAlert color="info">We are loading the form for you...</SimpleAlert>
  return <ClubForm club={data} />
}