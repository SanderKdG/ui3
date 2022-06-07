import {Paper, TextField} from "@mui/material";

export default function FilterField({filter, onChange} : {filter:string, onChange: (p:string) => void}) {
  return (
    <Paper sx={{maxWidth: "78em", m: "auto"}}>
      <TextField sx={{display: "flex"}} value={filter} onChange={event => onChange(event.target.value)}
                 id="outlined-basic" label="Search" variant="outlined"/>
    </Paper>
  )
}