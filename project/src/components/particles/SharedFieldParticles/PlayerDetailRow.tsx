import {useHistory} from "react-router";
import {useGetPlayer} from "../../../hooks/useGetSingle";
import {Box} from "@mui/system";
import {Avatar, CardActionArea, Typography} from "@mui/material";
import {getFullName} from "../../../domain/Player";
import SimpleAlert from "../SimpleAlert";

export function PlayerDetailRow({id} : { id : number }) {
    const history = useHistory()
    const {loading, data, error} = useGetPlayer("/players/"+id)
    if(error) return <SimpleAlert color={"error"}>{`Could not load player ${id}`}</SimpleAlert>
    if(loading) return <SimpleAlert color={"info"}>{`Loading player ${id}`}</SimpleAlert>
    return(
        <Box onClick={() => history.push("/players/"+id)}>
            <CardActionArea>
                <Box className="flexCards" sx={{p: 1}}>
                    <Avatar src={data.image} variant="square" />
                    <Typography sx={{m: "auto 10px"}}>
                        {getFullName(data)}
                    </Typography>
                </Box>
            </CardActionArea>
        </Box>
    )
}