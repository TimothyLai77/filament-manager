import { useEffect, useState } from 'react';
import { MdLibraryAdd } from 'react-icons/md';
import { Flex, Button, Tag, Text, Box, Card, Progress, Stat, FormatNumber, HStack, Stack } from '@chakra-ui/react';
import EditSpoolDialog from './EditSpoolDialog.jsx';
import MarkSpoolAsFinishedButton from './MarkSpoolAsFinishedButton.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const SpoolDetailCard = () => {

    const { spoolDetails, loading, error } = useSelector((state) => state.spools)
    const navigate = useNavigate();

    if (loading) return <h1>loading...</h1>
    if (error) return <h1>error something went wrong</h1>


    const spoolText = () => {
        let percentLeft = spoolDetails.filamentLeft / spoolDetails.initialWeight * 100
        let costPerGram = spoolDetails.cost / spoolDetails.initialWeight

        const displayButtons = () => {
            if (!spoolDetails.isEmpty) {
                return (
                    <Flex wrap="wrap" display="flex" justifyContent="flex-end" gap="5">


                        <EditSpoolDialog />

                        <Button
                            onClick={() => {
                                //setSelectedSpool(spool.id);
                                navigate(`/create-job/${spoolDetails.id}`);

                            }}
                        >
                            <MdLibraryAdd />
                            Create Job
                        </Button>
                        <MarkSpoolAsFinishedButton />
                    </Flex>

                )

            }
        }

        return (
            <>
                <Card.Title as="span" textStyle="3xl">
                    {spoolDetails.isEmpty ? <Text textStyle="4xl" color='red' >Status: Spool Finished</Text> : <></>}
                    {`Selected Spool: ${spoolDetails.name}`}
                </Card.Title>
                <Box>
                    <Tag.Root>
                        <Tag.Label>{spoolDetails.id}</Tag.Label>
                    </Tag.Root>
                </Box>

                <Stat.Root w={{ base: "100%", sm: "100%", md: "auto", lg: "50%" }} marginTop={3}>
                    <Stat.Label textStyle="md">Filament Left / Total</Stat.Label>
                    <Stat.ValueText textStyle="lg">
                        <Box marginRight={1}>
                            <FormatNumber value={spoolDetails.filamentLeft} style="unit" unit="gram" />
                        </Box>
                        {' / '}
                        <Box marginLeft={1}>

                            <FormatNumber value={`${spoolDetails.initialWeight}`} style="unit" unit="gram" />
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
                                <FormatNumber value={spoolDetails.cost} style="currency" currency="USD" />
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
                        <Text textStyle="lg" as="span">{spoolDetails.material}</Text>
                    </Box>

                    <Box>
                        <Text as="span" textStyle="lg" fontWeight="bold">Colour: </Text>
                        <Text textStyle="lg" as="span">{spoolDetails.colour}</Text>
                    </Box>
                    <Box>
                        <Text as="span" textStyle="lg" fontWeight="bold">Finish: </Text>
                        <Text textStyle="lg" as="span">{spoolDetails.finish ? spoolDetails.finish : 'None'}</Text>
                    </Box>

                    <Box>
                        <Text as="span" textStyle="lg" fontWeight="bold">Date Added: </Text>
                        <Text textStyle="lg" as="span">{spoolDetails.dateAdded}</Text>

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