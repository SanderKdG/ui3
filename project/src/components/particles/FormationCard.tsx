import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Skeleton } from '@mui/material';
import { Formation, getNumericFormation } from '../../domain/Formation';
import { useHistory } from 'react-router';

export default function FormationCard({formation} : {formation : Formation}) {
  const [copied, setCopied] = React.useState(false)
  const history = useHistory()

  async function copyAndUpdate() {
    await navigator.clipboard.writeText(`${window.location.origin}/formations/${formation.id}`)
    setCopied(true)
  }

  return (<>
    <Card sx={{ maxWidth: 345, m:1 }}>
      <CardActionArea onClick={() => history.push("/formations/"+formation.id)}>
        <CardMedia
          component="img"
          height="140"
          image={formation.image}
          alt={formation.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {formation.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {getNumericFormation(formation.playerPositions)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={copyAndUpdate}>
          {!copied ? "Share" : "Copied url to clipboard"}
        </Button>
        <Button size="small" color="primary" onClick={() => history.push("/formations/"+formation.id+"/modify")}>
          Modify
        </Button>
      </CardActions>
    </Card>
  </>
  );
}

export function PreviewFormationCard({formation} : {formation : Formation}) {
  const history = useHistory()
  return (<>
    <Card sx={{ maxWidth: 345, m:1, cursor: "pointer" }}>
      <CardActionArea onClick={() => history.push("/formations/"+formation.id)}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {formation.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {getNumericFormation(formation.playerPositions)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {formation.likes} likes
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </>
  );
}

export function LoadingFormationCard() {
  return (
    <Card sx={{ width: 200, textAlign: 'center', m: 1 }}>
      <Skeleton sx={{ height: 140 }} animation="wave" variant="rectangular" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Skeleton animation="wave" />
        </Typography>
          <Typography variant="body2" color="text.secondary">
          <Skeleton animation="wave" />
        </Typography>
      </CardContent>
      <CardActions>
        <Typography sx={{width: "50%"}}>
          <Skeleton animation="wave" />
        </Typography>
        <Typography sx={{width: "50%"}}>
          <Skeleton animation="wave" />
        </Typography>
      </CardActions>
    </Card>)
}