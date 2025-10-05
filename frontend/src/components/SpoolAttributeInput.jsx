import { useEffect, useState } from "react";
import { Combobox, useListCollection, useFilter, Portal } from "@chakra-ui/react";


/**
 * Component for the user input when adding a new spool to the database.
 * i.e. on Brand, Material, Colour, Finish would have the dropdown when filling the inputs
 */

// example for now
const frameworks = [
    { label: "React", value: "react" },
    { label: "Solid", value: "solid" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
    { label: "Preact", value: "preact" },
    { label: "Qwik", value: "qwik" },
    { label: "Lit", value: "lit" },
    { label: "Alpine.js", value: "alpinejs" },
    { label: "Ember", value: "ember" },
    { label: "Next.js", value: "nextjs" },
]

const testList = [
    "PLA",
    "PETG",
    "HT-PLA"
]

const SpoolAttributeInput = ({ inputLabel, list }) => {
    // for the elastic search, idk this is what chakra had for their combobox example
    const { contains } = useFilter({ sensitivity: "base" })
    const { collection, filter } = useListCollection({
        initialItems: frameworks,
        filter: contains,
    })

    return (
        <>
            <Combobox.Root
                collection={collection}
                onInputValueChange={(e) => filter(e.inputValue)}
                width="XL"
            >
                <Combobox.Label>{inputLabel}</Combobox.Label>
                <Combobox.Control>
                    <Combobox.Input placeholder="Type to search" />
                    <Combobox.IndicatorGroup>

                        <Combobox.Trigger />
                    </Combobox.IndicatorGroup>
                </Combobox.Control>
                <Portal>
                    <Combobox.Positioner>
                        <Combobox.Content>
                            <Combobox.Empty>No items found</Combobox.Empty>
                            {collection.items.map((item) => (
                                <Combobox.Item item={item} key={item.value}>
                                    {item.label}
                                    <Combobox.ItemIndicator />
                                </Combobox.Item>
                            ))}
                        </Combobox.Content>
                    </Combobox.Positioner>
                </Portal>
            </Combobox.Root>
        </>
    )
}
// getting the data back to the parent for later, but make a state in the parent, and pass those
// state setter functions as props
// for later : https://dev.to/bcostaaa01/how-to-pass-props-from-child-to-parent-component-in-react-1ci4
export default SpoolAttributeInput;