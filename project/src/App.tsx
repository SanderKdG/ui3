import Box from '@mui/material/Box'
import {
  BrowserRouter as Router,
} from "react-router-dom"
import HeadAppBar from "./components/navigation/Bar"
import { MyTheme } from './hooks/useMyTheme'
import "./css/App.css"
import MainRouter from './components/navigation/routers/Main'

export default function App() {
  return (
  <MyTheme>
    <Router>
      <Box sx={{ bgcolor: 'background.default', minHeight: "100vh" }}>
        <HeadAppBar />
        <Box sx={{ p: 3 }}>
          <MainRouter />
        </Box>
      </Box>
    </Router>
  </MyTheme>
  )
}