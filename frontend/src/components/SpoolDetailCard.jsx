import { selectedSpoolAtom, loadableSelectedSpoolDetailsAtom } from '../atoms.js';
import { useAtom } from 'jotai';
import { Text, Box, Card, Progress, Stat,FormatNumber, HStack, Stack } from '@chakra-ui/react';

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
        const costPerGram = spoolData.cost / spoolData.initialWeight
        return (
            <>
                <Card.Title textStyle="3xl">
                    {`Selected Spool: ${spoolData.name}`}
                </Card.Title>

                    <Stat.Root w={{ base: "100%", sm: "100%", md: "auto", lg: "50%" }} marginTop={3}>
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

       
                    <Stat.Root maxWidth="25%" marginTop={3}>
                    <Stat.Label textStyle="md">{`Cost ($) / g`}</Stat.Label>
                    <Stat.ValueText textStyle="lg">
                        <Box marginRight={1}>
                            <FormatNumber value={costPerGram} style="currency" currency="USD" />
                        </Box>
                    </Stat.ValueText>
         
                    </Stat.Root>
              


                
                <Stack marginTop={3}>
                    <Box>
                        <Text as="span" textStyle="lg" fontWeight="bold">Material: </Text>
                        <Text textStyle="lg" as="span">{spoolData.material}</Text>
                    </Box>

                    <Box>
                        <Text as="span" textStyle="lg" fontWeight="bold">Colour: </Text>
                        <Text textStyle="lg" as="span">{spoolData.colour}</Text>
                    </Box>      

                    <Box>
                        <Text as="span" textStyle="lg" fontWeight="bold">Date Added: </Text>
                        <Text textStyle="lg" as="span">{spoolData.dateAdded}</Text>
                    </Box>         
                </Stack>
       
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