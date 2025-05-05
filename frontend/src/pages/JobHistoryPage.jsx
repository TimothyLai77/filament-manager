import JobList from "../components/JobList";
import { Stack } from "@chakra-ui/react";
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
            <Stack margin={5}>
                <SpoolDetailCard />
                <JobList /> 
            </Stack>

        </>
    );
}
export default JobHistoryPage;