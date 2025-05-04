import JobList from "../components/JobList";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { selectedSpoolAtom } from "../atoms";
import { useEffect } from "react";
import HomeButton from "../components/HomeButton";
import SpoolDetailCard from "../components/SpoolDetailCard";
const JobHistoryPage = () => {
    const {spoolId} = useParams();
    const [,setSelectedSpool] = useAtom(selectedSpoolAtom);

    useEffect(() => {
        setSelectedSpool(spoolId);
    },[])

    return(
        <>
            <HomeButton />
            <SpoolDetailCard />
            <JobList /> 
        </>
    );
}
export default JobHistoryPage;