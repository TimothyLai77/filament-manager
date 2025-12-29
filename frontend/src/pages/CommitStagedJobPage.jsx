import TopNavBar from "@/components/TopNavBar";
import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStagedJob } from "@/features/stagedJobs/fetchStagedJobsSlice";
import JobCreationForm, { FORM_VARIANTS } from "@/components/JobCreationForm";
import { fetchActiveSpoolList } from "@/features/spools/spoolSlice";
import SpoolSelector from "@/components/spoolComponents/SpoolSelector";

const CommitStagedJobPage = () => {

    const { jobId } = useParams();
    const dispatch = useDispatch();
    const { detailLoading, error, stagedJobDetail } = useSelector((state) => state.fetchStagedJobs)
    const { spoolList, spoolDetail, loading, error: spoolError } = useSelector((state) => state.spools)
    useEffect(() => {
        dispatch(fetchStagedJob(jobId));
        dispatch(fetchActiveSpoolList());
    }, [dispatch, jobId])

    if (detailLoading || detailLoading == null) return <h1>loading...</h1>
    if (loading || loading == null) return <h1>loading...</h1>
    if (error || spoolError) return <h1>error</h1>
    console.log(stagedJobDetail)
    return (
        <>
            <TopNavBar />
            <Box>
                <Heading>Edit and Commit {jobId}</Heading>
                <Text>Name: {stagedJobDetail.name}</Text>
                <Text>Filament Used: {stagedJobDetail.filamentUsed}g</Text>
                <Text>{stagedJobDetail.date}</Text>
            </Box>
            <Box>
                <SpoolSelector spoolList={spoolList} />
            </Box>
            <Box>

                {/* <JobCreationForm formType={FORM_VARIANTS.staged} /> */}
            </Box>

        </>
    )
}

export default CommitStagedJobPage;