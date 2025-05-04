import { Card, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { loadableJobArrayAtom } from "../atoms";
const JobList = () => {
    const [getJobs] = useAtom(loadableJobArrayAtom)
    
    if(getJobs.state === 'hasError') return <h1>error loading history</h1>
    if(getJobs.state === 'loading') return <h1>loading</h1>
    const jobsArray = getJobs.data;

    return (
        jobsArray.map((job) => {
            return(
            <Card.Root key={job.id}>
                <Card.Title>
                    {job.name}
                </Card.Title>

                <Text>id: {job.id}</Text>
                <Text>amount: {job.filamentAmountUsed}</Text>
                <Text>cost: {job.cost}</Text>
                <Text>date: {job.date}</Text>
        

            </Card.Root>
            );

        })
    );
}
export default JobList;