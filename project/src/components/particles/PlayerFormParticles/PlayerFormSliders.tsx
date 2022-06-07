import {Paper} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import {Category, Player} from "../../../domain/Player";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";

export function PlayerFormSliders({player, setPlayer} : {player : Player, setPlayer : (p: Player) => void}) {


  function handleCategoryChange(pos: number, value: string) {
    let skills = player.skills
    skills[pos].category = Number.parseInt(value)
    setPlayer({...player, "skills": skills})
  }

  function handleSkillChangeSlider(pos: number, property: string, value: number | number[]) {
    let skills = player.skills
    let newValue = value
    if(Array.isArray(value)) newValue = value[0]
    if(property === "score") skills[pos].score = (newValue as number)
    if(property === "importance") skills[pos].importance = (newValue as number)
    setPlayer({...player, "skills": skills})
  }

  const fieldOptions = {m: 1, width: "auto"}
  return (<>
    {([0,1,2,3,4,5])
      .map(i => (
        <Paper key={i} sx={{m:1, p: 3, width: "fit-content", minWidth:"200px", height:'fit-content'}}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select sx={fieldOptions}
                    variant='standard'
                    value={player.skills[i].category}
                    label="Skill Category"
                    onChange={(event) => handleCategoryChange(i, event.target.value+"")}
            >
              {([0,1,2,3,4,5,6,7,8,9,10])
                .map((e : Category) => (
                  <MenuItem key={e} value={e}>{Category[e]}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <InputLabel sx={{m: 0, p: 0, ml: -0.7, mt: 1.2}}>Score</InputLabel>
          <Slider value={player.skills[i].score} onChange={(event, value) => handleSkillChangeSlider(i, "score", value)} valueLabelDisplay="auto" />
          <InputLabel sx={{m: 0, p: 0, ml: -0.7, mt: 1.2}}>Importance</InputLabel>
          <Slider value={player.skills[i].importance} onChange={(event, value) => handleSkillChangeSlider(i, "importance", value)} max={1} min={0} step={0.1} marks valueLabelDisplay="auto" />
        </Paper>
      ))}
    </>
  )
}