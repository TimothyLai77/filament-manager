import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpoolPage from './pages/SpoolPage';
import CreateSpoolPage from './pages/CreateSpoolPage' 
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SpoolPage />} />
        <Route path='/create-spool' element={<CreateSpoolPage/>}/ >
      </Routes>
    </BrowserRouter>
  )
}

export default App
