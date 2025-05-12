import JobList from "../components/JobList";
import { Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { selectedSpoolAtom, showSpoolManagementButtonsAtom } from "../atoms";
import { useEffect } from "react";
import SpoolDetailCard from "../components/SpoolDetailCard";
import TopNavBar from "../components/TopNavBar";
const JobHistoryPage = () => {
    const { spoolId } = useParams();
    const [, setSelectedSpool] = useAtom(selectedSpoolAtom);
    const [, setShowEditButton] = useAtom(showSpoolManagementButtonsAtom);
    useEffect(() => {
        setShowEditButton(true)
        setSelectedSpool(spoolId);
    }, [])

    return (
        <>
            <TopNavBar />
            <Stack margin={5}>
                <SpoolDetailCard />
                <JobList />
            </Stack>

        </>
    );
}
export default JobHistoryPage;