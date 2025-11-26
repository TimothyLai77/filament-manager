import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpoolPage from './pages/SpoolPage';
import CreateSpoolPage from './pages/CreateSpoolPage'
import CreateJobPage from './pages/CreateJobPage'
import SpoolDetailsPage from "./pages/SpoolDetailsPage";
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react"
import { ColorModeProvider } from "./components/ui/color-mode"

import { store } from "./app/store";
import { Provider } from 'react-redux'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "cyan" }
      },
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
    <Provider store={store}>
      <ChakraProvider value={system}>
        <ColorModeProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<SpoolPage />} />
              <Route path='/create-spool' element={<CreateSpoolPage />} />
              <Route path='/create-job/:spoolId' element={<CreateJobPage />} />
              <Route path='/details/:spoolId' element={<SpoolDetailsPage />} />
            </Routes>
          </BrowserRouter>
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>

  )
}

export default App
