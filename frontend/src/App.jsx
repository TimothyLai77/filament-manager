import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpoolPage from './pages/SpoolPage';
import CreateSpoolPage from './pages/CreateSpoolPage' 
import CreateJobPage from './pages/CreateJobPage'
import JobHistoryPage from "./pages/JobHistoryPage";
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react"
import { ColorModeProvider } from "./components/ui/color-mode"
const config = defineConfig({
  theme: {
    tokens: {
      colors: {},
    },
  },
  globalCss: {
    html: {
      colorPalette: "cyan", // Change this to any color palette you prefer
    },
  },
})


const system = createSystem(defaultConfig, config)
function App() {

  return (
    <ChakraProvider value={system}>
      <ColorModeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SpoolPage />} />
          <Route path='/create-spool' element={<CreateSpoolPage/>}/ >
          <Route path='/create-job/:spoolId' element={<CreateJobPage />}/>
          <Route path='/details/:spoolId' element={<JobHistoryPage />}/>
        </Routes>
      </BrowserRouter>
      </ColorModeProvider>
    </ChakraProvider>

  )
}

export default App
