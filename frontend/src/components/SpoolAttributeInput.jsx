import { useEffect, useState } from "react";
import { createListCollection, Listbox, useListCollection, useFilter, Input, Group, Button, Field, Popover, Portal } from "@chakra-ui/react";


/**
 * Component for the user input when adding a new spool to the database.
 * i.e. on Brand, Material, Colour, Finish would have the dropdown when filling the inputs
 */



const testList = [
    "PLA",
    "PETG",
    "HT-PLA"
]

const frameworks = createListCollection({
    items: [
        { label: "React.js", value: "react" },
        { label: "Vue.js", value: "vue" },
        { label: "Angular", value: "angular" },
        { label: "Svelte", value: "svelte" },
    ],
})

const SpoolAttributeInput = ({ inputLabel, list }) => {
    // for the elastic search, idk this is what chakra had for their combobox example

    return (
        <>
            <Field.Root>
                <Field.Label>{inputLabel}</Field.Label>
                <Group attached w="full" maxW="XL">
                    <Input />
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <Button variant="outline">
                                Search Existing
                            </Button>
                        </Popover.Trigger>

                        <Portal>
                            <Popover.Positioner>
                                <Popover.Content>
                                    <Popover.Arrow />
                                    <Popover.Body>
                                        <Listbox.Root collection={frameworks} width="320px">
                                            <Listbox.Label>Select framework</Listbox.Label>
                                            <Listbox.Content>
                                                {frameworks.items.map((framework) => (
                                                    <Listbox.Item item={framework} key={framework.value}>
                                                        <Listbox.ItemText>{framework.label}</Listbox.ItemText>
                                                        <Listbox.ItemIndicator />
                                                    </Listbox.Item>
                                                ))}
                                            </Listbox.Content>
                                        </Listbox.Root>
                                    </Popover.Body>
                                </Popover.Content>
                            </Popover.Positioner>
                        </Portal>
                    </Popover.Root>

                </Group>
            </Field.Root>
        </>
    )
}
// getting the data back to the parent for later, but make a state in the parent, and pass those
// state setter functions as props
// for later : https://dev.to/bcostaaa01/how-to-pass-props-from-child-to-parent-component-in-react-1ci4
export default SpoolAttributeInput;