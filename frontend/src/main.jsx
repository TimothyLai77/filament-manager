import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import App from './App.jsx'
import {Provider} from 'jotai'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <Provider>
        <App />
      </Provider>
    </ChakraProvider>
  </StrictMode>,
)
