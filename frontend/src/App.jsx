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
        {/* <Route path='/create-job' element={<CreateJobPage />} /> */}
        {/* //todo: uh flip this around so it's create-job/:spoolId... */}
        <Route path='/:spoolId/create-job' element={<CreateJobPage />}/>
        <Route path='/job-history/:spoolId' element={<JobHistoryPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
