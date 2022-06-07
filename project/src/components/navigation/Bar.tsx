import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Drawer from './Drawer'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import IconButton from '@mui/material/IconButton'
import {useMyTheme} from '../../hooks/useMyTheme'

export default function HeadAppBar() {
  const theme = useMyTheme()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{background: '#3E4976'}}>
          <Drawer />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { sm: 'block' } }}
          >Belgian Leagues
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={theme.toggleColorMode} color="inherit">
            {theme.currentMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
