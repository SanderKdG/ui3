import { PaletteMode } from "@mui/material";
import {createContext, useContext, useMemo, useState} from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles'

export const getDesignTokens = (mode : PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: '#8490CA',
    },
    error: {
      main: '#cb5e54',
    },
    warning: {
      main: '#ffba52',
    },
    info: {
      main: '#4c85b1',
    },
    success: {
      main: '#59a05c',
    },
    default: {
      main: '#fff',
    },
    background: {
      default: "#262E44",
      paper: "#384362",
    },
    ...(mode === 'light' && {
      background: {
        default: "#eaeef3",
        paper: "#fff",
      },
      primary: {
        main: '#5768b1',
      },
      default: {
        main: '#000',
      },
    }),
  },
});

export function useMyTheme() {
  return useContext(ColorModeContext)
}

export const ColorModeContext = createContext({ toggleColorMode: () => { }, currentMode: "light" });

export function MyTheme({children} : {children : JSX.Element}) {
  const [mode, setMode] = useState<PaletteMode>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      currentMode: mode
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme(getDesignTokens(mode)), [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
