import { VStack, Text, Box, Heading } from "@chakra-ui/react"
import { fetchStagedJobs } from "@/features/stagedJobs/fetchStagedJobsSlice"
import { useSelector } from "react-redux"

import dayjs from "dayjs"
import StagedJobListEntry from "./StagedJobListEntry"

const StagedJobList = () => {
    const { stagedJobList, loading, error } = useSelector((state) => state.fetchStagedJobs)



    if (loading) return <h1>loading...</h1>
    if (error) return <h1>error</h1>



    let formattedList = stagedJobList.map(job => ({
        // copy everything over from the current job
        ...job,
        // change the datestring into a JS date object
        date: new Date(job.date)
    }));

    formattedList.sort((a, b) => {
        return b.date - a.date
    });
    //console.log(formattedList)
    formattedList = formattedList.map(job => ({
        ...job,
        formattedDate: dayjs(job.date).format('ddd MMM D')
    }))
    const jobsByDate = formattedList.reduce((acc, job) => {
        if (!acc[job.formattedDate]) {
            acc[job.formattedDate] = []
        }
        acc[job.formattedDate].push(job)
        return acc
    }, {})

    return (
        <Box w={{ base: '99%', md: '98%' }} mx='auto'>
            {
                <VStack align="stretch" spacing={10}>
                    {
                        Object.keys(jobsByDate).map(day => {
                            return (
                                <Box>
                                    <Heading>{day}</Heading>
                                    {
                                        <VStack align="stretch">
                                            {
                                                jobsByDate[day].map(job => {
                                                    return <StagedJobListEntry key={job.id} id={job.id} name={job.name} filamentUsed={job.filamentUsed} date={job.date} />
                                                })
                                            }
                                        </VStack>

                                    }

                                </Box>
                            )
                        })
                    }
                </VStack>
            }


        </Box>


    );
}


export default StagedJobList