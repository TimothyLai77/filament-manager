import { Button, Card, Heading, Tag, Text, HStack, Spacer, VStack } from "@chakra-ui/react"
import { MdOutlineDelete, MdCheck } from "react-icons/md";
import { useSelector } from "react-redux"
import { deleteStagedJob } from "@/features/stagedJobs/deleteStagedJobSlice";
import { useDispatch } from "react-redux";
const StagedJobListEntry = ({ id, name, filamentUsed, date }) => {
    const dispatch = useDispatch();
    const handleDelete = () => {
        dispatch(deleteStagedJob(id));
    }
    return (
        <Card.Root size="sm" minW={{ base: "100%", sm: "400px", md: "85%" }} flexDirection="row">

            <Card.Body>
                <HStack flexDirection={"row"} gap={10} flexWrap={"wrap"} >
                    <VStack align="flex-start" spacing={0} minW="100px">
                        <Text fontWeight={"bold"} size="xl">{name}</Text>
                        <Tag.Root>
                            <Tag.Label>{id}</Tag.Label>
                        </Tag.Root>
                    </VStack>

                    <Text>Filament Used: {filamentUsed}g</Text>
                    <Text>{date.toString()}</Text>
                    <Spacer />
                    <HStack>
                        <Button size={'sm'}>
                            <MdCheck />
                            Edit & Commit
                        </Button>
                        <Button size={'sm'} colorPalette={"red"} onClick={handleDelete}>
                            <MdOutlineDelete />
                            Delete
                        </Button>
                    </HStack>

                </HStack>


            </Card.Body>
        </Card.Root>

    )
}

export default StagedJobListEntry