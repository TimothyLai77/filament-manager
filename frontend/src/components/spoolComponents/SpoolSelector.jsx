import { useDispatch } from "react-redux"
import { setSelectedSpool } from "@/features/spools/spoolSlice"
import { Select, Box, Portal, useListCollection, Span, Stack } from "@chakra-ui/react"


//TODO: make some helper functions and export them... instead of copy and pasting them.
// this is REALLY stupid.
// this is stupid
const formatInputArray = (array) => {
    // This is really stupid... but idk how to strip out the excess information from the spool list...
    const formattedArray = []
    array.forEach(element => {
        formattedArray.push({
            label: `${element.name}`, value: `${element.id}`, description: `${`${element.colour} ${element.material} | ${element.filamentLeft}g left`}`
        })
    });
    return formattedArray;
}


const SpoolSelector = ({ spoolList }) => {
    const dispatch = useDispatch();
    const { collection } = useListCollection({
        initialItems: formatInputArray(spoolList)
    })

    const handleSelect = (e) => {
        console.log(e.value)
        dispatch(setSelectedSpool(e.value))
    }

    return (
        <Box>
            <Select.Root collection={collection} size="sm" width="320px" onSelect={handleSelect}>
                <Select.HiddenSelect />
                <Select.Control>
                    <Select.Trigger>
                        <Select.ValueText placeholder="Select Spool" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                    <Select.Positioner>
                        <Select.Content>
                            {collection.items.map((spool) => (
                                <Select.Item item={spool} key={spool.id}>
                                    <Stack gap={0}>
                                        <Select.ItemText>
                                            {`${spool.label}`}
                                        </Select.ItemText>
                                        <Span color="fg.muted" textStyle="xs">
                                            {spool.description}
                                        </Span>
                                    </Stack>
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>
        </Box>

    )
}

export default SpoolSelector