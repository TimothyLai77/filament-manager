import { selectedSpoolAtom, loadableSelectedSpoolDetailsAtom } from '../atoms.js';
import { useAtom } from 'jotai';
import {Text, Box, Card, Progress, Stat,FormatNumber, HStack } from '@chakra-ui/react';

const SpoolDetailCard = () => {
    const [selectedSpool] = useAtom(selectedSpoolAtom);
    const [spool] = useAtom(loadableSelectedSpoolDetailsAtom);
    const spoolText = () => {
        if(spool.state === 'loading'){
            return (
                <h1>Loading...</h1>
            );
        }
        if(spool.state === 'hasError'){
            return (
                <h1>Error</h1>
            )
        }
        const spoolData = spool.data
        //console.log(spoolData)
        const percentLeft = spoolData.filamentLeft/spoolData.initialWeight*100
        return (
            <>
                <Card.Title textStyle="3xl">
                    {`Selected Spool: ${spoolData.name}`}
                </Card.Title>
                        <Stat.Root w={{ base: "100%", sm: "100%", md: "auto", lg: "50%" }} marginTop={5}>
                        <Stat.Label textStyle="md">Filament Left / Total</Stat.Label>
                        <Stat.ValueText textStyle="lg">
                            <Box marginRight={1}>
                                <FormatNumber value={spoolData.filamentLeft} style="unit" unit="gram" />
                            </Box>
                            {' / '}
                            <Box marginLeft={1}>

                                <FormatNumber value={`${spoolData.initialWeight}`} style="unit" unit="gram" />
                            </Box>
                        </Stat.ValueText>
                              <Progress.Root value={percentLeft} shape="full">
                                <HStack gap="5">
                                    <Progress.Track flex="1">
                                        <Progress.Range />
                                    </Progress.Track>
                                    <Progress.ValueText>{percentLeft.toFixed(2)}%</Progress.ValueText>
                                </HStack>
                            </Progress.Root>
                        </Stat.Root>
                <Card.Description>


                    {spoolData.id}
                    {spoolData.name}
                    {spoolData.colour}
                    Filament Used: {spoolData.filamentUsed}
                    Filament Left: {spoolData.filamentLeft}
                    Cost of Spool: {spoolData.cost}
                    Date added to database: {spoolData.dateAdded}
                    Number of Jobs Completed: {spoolData.numberOfJobs}
                </Card.Description>
       
            </>
        )
    }

    return(
        <>
            <Card.Root>
                <Card.Body>
                    {spoolText()}
                </Card.Body>
            </Card.Root>
        </>
    )
}
export default SpoolDetailCard;