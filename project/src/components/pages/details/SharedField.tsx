import {Box} from "@mui/system";
import "../../../css/Field.css"
import {Formation} from "../../../domain/Formation";
import {useState} from "react";
import {useParams} from "react-router";
import {Badge, FormControlLabel, Paper, Switch, ToggleButton, Typography} from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import SimpleAlert from "../../particles/SimpleAlert";
import {useGetFormation} from "../../../hooks/useGetSingle";
import {putObject} from "../../../functions/objectService";
import {TextualField} from "../../particles/SharedFieldParticles/TextualField";
import {PlayerDetailRow} from "../../particles/SharedFieldParticles/PlayerDetailRow";
import {Field} from "../../particles/Field"

type RouterParams = { id: string }
export default function SharedField() {
  const {id} = useParams<RouterParams>()
  const {loading, data: formation, refetch, error: getError} = useGetFormation("/formations/" + id)
  const [liked, setLiked] = useState(false)
  const [error, setError] = useState<string | null>()
  const [visualField, setVisualField] = useState(true)
  if (getError) return <SimpleAlert color="error">An error has occurred, we could not fetch the formation.</SimpleAlert>
  if (error) return <SimpleAlert color="error">{error}</SimpleAlert>
  if (loading) return <SimpleAlert color="info">We are loading the field for you...</SimpleAlert>

  async function updateLikes() {
    let newFormation = formation

    if (liked) newFormation.likes--
    else newFormation.likes++

    if (await putObject<Formation>(`/formations/${formation.id}`, newFormation)) {
      setLiked(!liked)
      await refetch()
    } else {
      setError("An error has occurred, could not update the formation.")
    }
  }

  return (
    <div className="flexCards centerCards">
      {visualField ? <Field showAddIcons={false} formation={formation} setAddToPosition={() => {
      }}/> : <TextualField formation={formation}/>}

      <Box>
        <Paper sx={{p: 2, m: 1, height: "fit-content"}}>
          <Box sx={{display: "flex"}}>
            <Typography variant="h5" sx={{m: "auto"}}>
              <b>Formation:</b> {formation.name}
            </Typography>
            <Badge color="primary" badgeContent={formation.likes} sx={{height: "fit-content", ml: 5, mt: 0}}>
              <ToggleButton
                value="check"
                selected={liked}
                onChange={updateLikes}
              >
                <CheckIcon/>
              </ToggleButton>
            </Badge>
          </Box>
          <FormControlLabel
            value={visualField}
            onChange={() => setVisualField(!visualField)}
            control={<Switch defaultChecked/>}
            label="Visual Field"
            labelPlacement="start"
          />
        </Paper>
        <div className="flexCards">
          <Paper sx={{p: 2, m: 1, height: "fit-content", width: "fit-content", maxHeight: 400, overflowY: "auto"}}>
            <Typography variant="h6">Selected players</Typography>
            {
              formation.playerPositions.map(p => (
                <PlayerDetailRow id={p.playerId} key={p.playerId}/>
              ))
            }
          </Paper>
          <Paper sx={{p: 2, m: 1, height: "fit-content", width: "fit-content"}}>
            <img width="100" src={formation.image} alt={formation.name}/>
          </Paper>
        </div>
      </Box>
    </div>
  )
}