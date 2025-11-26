import { Tag, Box, Card, FormatNumber, Text, Button } from "@chakra-ui/react";
import EditJobDialog from "./EditJobDialog";
import { useSelector } from "react-redux";
const JobList = () => {
    const { jobLoading, jobError, jobList } = useSelector((state) => state.jobs)
    const { spoolLoading, spoolError, spoolDetails } = useSelector((state) => state.spools)
    if (jobLoading || spoolLoading) return <h1>loading...</h1>
    if (jobError || spoolError) return <h1>error loading job history</h1>

    // boolean to decide whether to render the edit job button. Should not display for a spool marked as empty/finished
    const displayEditJobButton = !spoolDetails.isEmpty;


    return (
        jobList.toReversed().map((job, index) => {
            return (
                <Card.Root key={job.id}>
                    <Card.Body>
                        <Card.Title textStyle="2xl">
                            #{jobList.length - index}: {job.name}
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