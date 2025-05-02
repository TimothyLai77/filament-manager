import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpoolPage from './pages/SpoolPage';
import CreateSpoolPage from './pages/CreateSpoolPage' 
import CreateJobPage from './pages/CreateJobPage'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SpoolPage />} />
        <Route path='/create-spool' element={<CreateSpoolPage/>}/ >
        <Route path='/create-job' element={<CreateJobPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
