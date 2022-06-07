import * as React from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

interface SimpleAlertProps {
  color: AlertColor;
  children: string;
}

export default function SimpleAlert({color, children} : SimpleAlertProps) {
  if(!(children.length > 0)) return <></>
  return (
    <Stack sx={{ width: 'fit-content', minWidth: 15, m: 'auto' }} spacing={2}>
      <Alert severity={color} sx={{m: '1em'}}>
        <AlertTitle>{firstLetterCapital(color)}</AlertTitle>
        {children}
      </Alert>
    </Stack>
  );
}

function firstLetterCapital(text : string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}