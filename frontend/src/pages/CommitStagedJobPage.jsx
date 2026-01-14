import TopNavBar from "@/components/TopNavBar";
import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStagedJob } from "@/features/stagedJobs/stagedJobSlice";
import JobCreationForm, { FORM_VARIANTS } from "@/components/JobCreationForm";
import { clearSpoolDetails, fetchActiveSpoolList, fetchSpoolById } from "@/features/spools/spoolSlice";
import SpoolSelector from "@/components/spoolComponents/SpoolSelector";
import { setSelectedSpool } from "@/features/spools/spoolSlice";

const CommitStagedJobPage = () => {

    const { jobId } = useParams();
    const dispatch = useDispatch();
    const { detailLoading, deleteError, stagedJobDetail } = useSelector((state) => state.stagedJobs)
    const { spoolList, selectedSpool, spoolDetails, loading, error: spoolError } = useSelector((state) => state.spools)

    useEffect(() => {
        // clear the state data
        dispatch(clearSpoolDetails());
        dispatch(setSelectedSpool(null));

        dispatch(fetchStagedJob(jobId));
        dispatch(fetchActiveSpoolList());
    }, [dispatch, jobId]);

    // fetch the spool information from the server, when a selection from the dropdown is picked
    useEffect(() => {
        dispatch(fetchSpoolById(selectedSpool))
    }, [selectedSpool])



    if (detailLoading || detailLoading == null) return <h1>loading...</h1>
    if ((loading && !spoolList) || loading == null) return <h1>loading...</h1>
    if (deleteError || spoolError) return <h1>error</h1>
    console.log(stagedJobDetail)
    console.log(spoolDetails)
    return (
        <>
            <TopNavBar />
            <h1>DEBUG: Selected Spool: {selectedSpool ? selectedSpool : "select a spool"}</h1>
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
                {
                    selectedSpool && spoolDetails ?
                        <JobCreationForm formType={FORM_VARIANTS.staged} spoolDetails={spoolDetails} jobDetails={stagedJobDetail} />
                        :
                        <></>
                }

            </Box>

        </>
    )
}

export default CommitStagedJobPage;