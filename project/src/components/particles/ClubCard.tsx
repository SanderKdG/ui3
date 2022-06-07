import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Club } from '../../domain/Club';
import { Skeleton } from '@mui/material';
import { useHistory } from 'react-router';

export default function ClubCard({club} : { club: Club }) {
  const history = useHistory()
  return (
    <Card sx={{ display: 'flex', m:1, minWidth:250, cursor: "pointer", width:"fit-content" }} onClick={() => history.push("/clubs/"+club.id)}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {club.shortName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            <small>{club.name}</small>
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{ maxHeight: 151, maxWidth: 151, mr: 1, opacity: "0.5" }}
        image={club.logo}
        alt={club.name}
      />
    </Card>
  );
}

export function LoadingClubCard() {
  return (
    <Skeleton sx={{ width: 250, height:180, m:1 }} />
  );
}