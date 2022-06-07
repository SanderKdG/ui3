import AddIcon from '@mui/icons-material/Add';
import { Box } from "@mui/system";
import { useHistory } from "react-router";

export default function AddCard({to} : {to: string}) {
  const history = useHistory()
  return (
    <Box sx={{ cursor: "pointer", height: "fit-content", m: "auto 5px", p: 5, textAlign: "center"}} onClick={() => history.push(to)}>
      <AddIcon sx={{opacity: 0.8, fontSize: 80, color: "primary.main"}} />
    </Box>
  );
}