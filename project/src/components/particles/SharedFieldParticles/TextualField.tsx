import {Formation, getPositionKeys, Position} from "../../../domain/Formation";
import {Paper, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {useGetPlayer} from "../../../hooks/useGetSingle";
import {getFullName} from "../../../domain/Player";

export function TextualField({formation} : {formation : Formation}) {
    return (
        <>
            <Paper sx={{width: 450, m:1, height: "fit-content", maxHeight: 650, overflowY: "auto"}}>
                <Typography sx={{p: 1}} variant="h5">Players in their positions:</Typography>
                <Box sx={{p: 1}}>
                    {getPositionKeys().map(e => (
                        <Box key={e}>
                            {formation.playerPositions.filter(pp => pp.position === e).length > 0 ? (<>
                                <Typography variant="h6">{Position[e]}</Typography>
                                <Box sx={{mb: 2}}>
                                    {formation.playerPositions.filter(pp => pp.position === e).map( i => (
                                        <PlayerName key={i.playerId} id={i.playerId} />
                                    ))}
                                </Box>
                            </>) : ""}
                        </Box>
                    ))}
                </Box>
            </Paper>
        </>
    )
}

function PlayerName({id} : {id: number}) {
    const {loading, data, error} = useGetPlayer("/players/"+id)
    if(error) return <Typography sx={{display: "block"}}>Could not load player id {id}</Typography>
    if(loading) return <Typography sx={{display: "block"}}>Loading {id}...</Typography>
    return <Typography sx={{display: "block"}}>{getFullName(data)}</Typography>
}