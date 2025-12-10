import { VStack } from "@chakra-ui/react"
import { fetchStagedJobs } from "@/features/stagedJobs/fetchStagedJobsSlice"
import { useSelector } from "react-redux"
import StagedJobListEntry from "./StagedJobListEntry"
const StagedJobList = () => {
    const { stagedJobList, loading, error } = useSelector((state) => state.fetchStagedJobs)
    if (loading) return <h1>loading...</h1>
    if (error) return <h1>error</h1>
    console.log(stagedJobList)
    return (
        <>
            <VStack>
                {
                    stagedJobList.map(job => {
                        return <StagedJobListEntry key={job.id} id={job.id} name={job.name} filamentUsed={job.filamentUsed} date={job.date} />
                    })

                }
            </VStack>

        </>


    );
}


export default StagedJobList