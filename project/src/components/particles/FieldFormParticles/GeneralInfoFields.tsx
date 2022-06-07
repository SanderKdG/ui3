import { Paper, Typography, TextField, Button } from "@mui/material";
import { Formation, getNumericFormation } from "../../../domain/Formation";
import { isImage } from "../../../functions/isImage";

interface GeneralInfoFieldsProps {
  formation : Formation,
  handleChange : (k : string, v : string) => void,
  submitFormation : () => void,
  deleteFormation : () => void
}

export function GeneralInfoFields({formation, handleChange, submitFormation, deleteFormation} : GeneralInfoFieldsProps) {
  const fieldOptions = {m: 1, width: "90%"}

  return (
    <Paper sx={{m: 1, height:"fit-content", p: 2, width: 300}}>
      <Typography variant="h5" sx={{mb: 3}}>
        General Information
      </Typography>
      <TextField
        sx={fieldOptions}
        label="Formation"
        value={getNumericFormation(formation.playerPositions)}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        error={formation.name.length === 0}
        sx={fieldOptions}
        helperText={formation.name.length === 0 ? "Please fill in a name" : ""}
        label="Name"
        inputProps={{ maxLength: 15 }}
        value={formation.name}
        onChange={(event) => handleChange("name", event.target.value)}
      />
      <TextField
        error={formation.image.length > 0 && !isImage(formation.image)}
        sx={fieldOptions}
          helperText={formation.image.length > 0 && !isImage(formation.image) ? "Please insert a valid image" : ""}
        label="Image (optional)"
        type="url"
        value={formation.image}
        onChange={(event) => handleChange("image", event.target.value)}
      />
      <Button onClick={submitFormation} sx={fieldOptions} variant="contained" color={formation.id === null ? "success" : "primary"}>{formation.id === null ? "Create Formation" : "Save Changes"}</Button>
      {formation.id !== null ? <Button sx={fieldOptions} variant="contained" color="error" onClick={deleteFormation}>Delete</Button> : <></>}
    </Paper>
  )
}