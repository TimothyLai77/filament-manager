import { Tag, Box, Card, FormatNumber, Text, Button } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { finalJobArrayAtom, finalSelectedSpoolAtom } from "@/atoms/atoms";
import EditJobDialog from "./EditJobDialog";
const JobList = () => {
    const [getJobs] = useAtom(finalJobArrayAtom)
    const [spool] = useAtom(finalSelectedSpoolAtom);
    if (getJobs.state === 'hasError') return <h1>error loading history</h1>
    if (getJobs.state === 'loading') return <h1>loading</h1>

    const jobsArray = getJobs.data;

    const displayEditJobButton = !spool.data.isEmpty;


    return (
        jobsArray.toReversed().map((job, index) => {
            return (
                <Card.Root key={job.id}>
                    <Card.Body>
                        <Card.Title textStyle="2xl">
                            #{jobsArray.length - index}: {job.name}
                        </Card.Title>

                        <Box>
                            <Text as="span" textStyle="lg" fontWeight="bold">Date: </Text>
                            <Text textStyle="lg" as="span">
                                {job.date}
                            </Text>
                        </Box>

                        <Box>
                            <Text as="span" textStyle="lg" fontWeight="bold">Cost: </Text>
                            <Text textStyle="lg" as="span">
                                <FormatNumber style="currency" currency="USD" value={job.cost} />
                            </Text>
                        </Box>


                        <Box>
                            <Text as="span" textStyle="lg" fontWeight="bold">Filament Used: </Text>
                            <Text textStyle="lg" as="span">
                                <FormatNumber style="unit" unit="gram" value={job.filamentAmountUsed} />
                            </Text>
                        </Box>

                        <Box>
                            <Tag.Root>
                                <Tag.Label>{job.id}</Tag.Label>
                            </Tag.Root>
                        </Box>
                        {
                            displayEditJobButton ?
                                <Box display="flex" justifyContent="flex-end">
                                    <EditJobDialog job={job} />
                                </Box>
                                :
                                <></>
                        }

                    </Card.Body>



                </Card.Root>
            );

        })
    );
}
export default JobList;