import { BrowserRouter, Routes, Route } from "react-router-dom";
import SpoolPage from './pages/SpoolPage';
import CreateSpoolPage from './pages/CreateSpoolPage' 
import CreateJobPage from './pages/CreateJobPage'
import JobHistoryPage from "./pages/JobHistoryPage";
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SpoolPage />} />
        <Route path='/create-spool' element={<CreateSpoolPage/>}/ >
        <Route path='/create-job/:spoolId' element={<CreateJobPage />}/>
        <Route path='/details/:spoolId' element={<JobHistoryPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
