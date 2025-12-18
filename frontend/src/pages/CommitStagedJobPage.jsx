import TopNavBar from "@/components/TopNavBar";
import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStagedJob } from "@/features/stagedJobs/fetchStagedJobsSlice";

const CommitStagedJobPage = () => {
    //TODO: technically the job object should be passed in through react-router-dom. I could use that object passed, but either way, if the state is lost from refreshing
    // i would still need to use the redux async thunk to re-fetch the data anyways. so idk...
    const { jobId } = useParams();
    const dispatch = useDispatch();
    const { loading, error, stagedJobDetail } = useSelector((state) => state.fetchStagedJobs)
    // todo: really buggy. if you send a staged job to the server. and then try to edit & commit, the stagedjobdetail doesn't load fully. if you refresh it'll refetch and the state
    // getss set properly. pls fix.
    useEffect(() => {
        dispatch(fetchStagedJob(jobId));
    }, [dispatch])

    if (loading || loading == null) return <h1>loading...</h1>
    if (error) return <h1>error</h1>
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

        </>
    )
}

export default CommitStagedJobPage;