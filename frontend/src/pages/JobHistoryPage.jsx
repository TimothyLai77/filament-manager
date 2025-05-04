import JobList from "../components/JobList";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { selectedSpoolAtom } from "../atoms";
import { useEffect } from "react";
import HomeButton from "../components/HomeButton";
const JobHistoryPage = () => {
    const {spoolId} = useParams();
    const [,setSelectedSpool] = useAtom(selectedSpoolAtom);

    useEffect(() => {
        setSelectedSpool(spoolId);
    },[])

    return(
        <>
            <HomeButton />
            {/* <JobList />  */}
        </>
    );
}
export default JobHistoryPage;