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
    const { spoolDetails, loading, error } = useSelector((state) => state.spools)



    useEffect(() => {
        // fetch spool details for the child, and place it in store
        dispatch(fetchSpoolById(spoolId));
        dispatch(fetchJobListById(spoolId));

    }, [dispatch, spoolId])
    if (loading || spoolDetails === null) return <h1>loading...</h1>
    if (error) return <h1>error something went wrong</h1>


    return (
        <>
            <TopNavBar />
            <Stack margin={5}>
                <SpoolDetailCard spoolDetails={spoolDetails} />
                <JobList />
            </Stack>

        </>
    );
}
export default SpoolDetailsPage;