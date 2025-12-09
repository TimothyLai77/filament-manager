import { fetchStagedJobs } from "@/features/stagedJobs/fetchStagedJobsSlice"
import { useSelector } from "react-redux"
const StagedJobList = () => {
    const { stagedJobList, loading, error } = useSelector((state) => state.fetchStagedJobs)
    if (loading) return <h1>loading...</h1>
    if (error) return <h1>error</h1>
    console.log(stagedJobList)
    return (
        <ul>
            {
                stagedJobList.map(job => {
                    return <li key={job.id}> {`${job.id} | ${job.name} | ${job.filamentUsed} | ${job.date} `} </li>
                })
            }
        </ul>

    );
}


export default StagedJobList