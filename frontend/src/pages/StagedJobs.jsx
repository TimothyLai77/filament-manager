import TopNavBar from "@/components/TopNavBar"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { fetchStagedJobs } from "@/features/stagedJobs/stagedJobSlice"

import StagedJobList from "@/components/stagedJobComponents/StagedJobList"
const StagedJobs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchStagedJobs());
    }, [dispatch])

    return (
        <>
            <TopNavBar />
            <StagedJobList />
        </>
    )
}

export default StagedJobs