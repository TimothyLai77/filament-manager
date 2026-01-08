import JobList from "@/components/JobList";
import { Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import SpoolDetailCard from "../components/SpoolDetailCard";
import TopNavBar from "../components/TopNavBar";
import { fetchSpoolById } from "@/features/spools/spoolSlice";
import { fetchJobListById } from '@/features/jobs/jobSlice'
const SpoolDetailsPage = () => {
    const { spoolId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        // fetch spool details for the child, and place it in store
        dispatch(fetchSpoolById(spoolId));
        dispatch(fetchJobListById(spoolId));

    }, [dispatch, spoolId])


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
export default SpoolDetailsPage;