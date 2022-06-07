import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import ShieldIcon from '@mui/icons-material/Shield';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import {Link} from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {Divider, IconButton} from '@mui/material';

export default function MyDrawer() {
  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState(open);
      };

  return (
    <React.Fragment>
      <IconButton
        onClick={toggleDrawer(true)}
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{mr: 2}}>
          <MenuIcon/>
      </IconButton>
      <Drawer
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{width: 250}}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <DetailedListItem title={"Home"} to={"/home"}><HomeIcon/></DetailedListItem>
          </List>

          <Divider/>

          <List>
            <DetailedListItem title={"Clubs"} to={"/clubs"}><ShieldIcon/></DetailedListItem>
            <DetailedListItem title={"Players"} to={"/players"}><PeopleAltIcon/></DetailedListItem>
            <DetailedListItem title={"My formations"} to={"/formations"}><AssignmentIcon/></DetailedListItem>
          </List>

          <Divider/>

          <List>
            <DetailedListItem title={"New club"} to={"/clubs/new"}><AddModeratorIcon/></DetailedListItem>
            <DetailedListItem title={"New player"} to={"/players/new"}><PersonAddIcon/></DetailedListItem>
            <DetailedListItem title={"New formation"} to={"/formations/new"}><AddIcon/></DetailedListItem>
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  );
}

function DetailedListItem({to, children, title} : {to:string, title:string, children?: JSX.Element}) {
  return (
    <ListItem button component={Link} to={to}>
      <ListItemIcon>
        {children}
      </ListItemIcon>
      <ListItemText primary={title}/>
    </ListItem>
  )
}