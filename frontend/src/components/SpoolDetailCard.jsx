import { selectedSpoolAtom, showSpoolManagementButtonsAtom, finalSelectedSpoolAtom } from '../atoms.js';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { MdLibraryAdd } from 'react-icons/md';
import { Button, Tag, Text, Box, Card, Progress, Stat, FormatNumber, HStack, Stack } from '@chakra-ui/react';
import EditSpoolDialog from './EditSpoolDialog.jsx';
import MarkSpoolAsFinishedButton from './MarkSpoolAsFinishedButton.jsx';
import { useNavigate } from 'react-router-dom';
const SpoolDetailCard = () => {
    const [showEditButton] = useAtom(showSpoolManagementButtonsAtom)
    const [selectedSpool] = useAtom(selectedSpoolAtom);
    //const [spool] = useAtom(loadableSelectedSpoolDetailsAtom);
    const [spool] = useAtom(finalSelectedSpoolAtom);
    const navigate = useNavigate();


    const spoolText = () => {
        if (spool.state === 'loading') {
            return (
                <h1>Loading...</h1>
            );
        }
        if (spool.state === 'hasError') {
            return (
                <h1>Error</h1>
            )
        }
        const spoolData = spool.data
        //console.log(spoolData)

        let percentLeft = spoolData.filamentLeft / spoolData.initialWeight * 100
        let costPerGram = spoolData.cost / spoolData.initialWeight

        const displayButtons = () => {
            if (showEditButton && !spoolData.isEmpty) {
                return (
                    <Box display="flex" justifyContent="flex-end" gap="5">
                        <EditSpoolDialog />

                        <Button
                            onClick={() => {
                                //setSelectedSpool(spool.id);
                                navigate(`/create-job/${spoolData.id}`);

                            }}
                        >
                            <MdLibraryAdd />
                            Create Job
                        </Button>
                        <MarkSpoolAsFinishedButton />
                    </Box>

                )

            }
        }

        return (
            <>
                <Card.Title as="span" textStyle="3xl">
                    {spoolData.isEmpty ? <Text textStyle="4xl" color='red' >Status: Spool Finished</Text> : <></>}
                    {`Selected Spool: ${spoolData.name}`}
                </Card.Title>
                <Box>
                    <Tag.Root>
                        <Tag.Label>{spoolData.id}</Tag.Label>
                    </Tag.Root>
                </Box>

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

                <Box marginTop={3}>
                    <Stat.Root>
                        <Stat.Label textStyle="md">{`Spool Cost`}</Stat.Label>
                        <Stat.ValueText textStyle="lg">
                            <Box marginRight={1}>
                                <FormatNumber value={spoolData.cost} style="currency" currency="USD" />
                            </Box>
                        </Stat.ValueText>
                    </Stat.Root>


                    <Stat.Root marginTop={2}>
                        <Stat.Label textStyle="md">{`Cost ($) / g`}</Stat.Label>
                        <Stat.ValueText textStyle="lg">
                            <Box marginRight={1}>
                                <FormatNumber value={costPerGram} style="currency" currency="USD" />
                            </Box>
                        </Stat.ValueText>
                    </Stat.Root>
                </Box>





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
                        <Text as="span" textStyle="lg" fontWeight="bold">Finish: </Text>
                        <Text textStyle="lg" as="span">{spoolData.finish ? spoolData.finish : 'None'}</Text>
                    </Box>

                    <Box>
                        <Text as="span" textStyle="lg" fontWeight="bold">Date Added: </Text>
                        <Text textStyle="lg" as="span">{spoolData.dateAdded}</Text>

                    </Box>
                    {displayButtons()}

                </Stack>


            </>
        )
    }

    return (
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