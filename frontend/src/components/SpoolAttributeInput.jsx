import { useEffect, useState } from "react";
import { createListCollection, Listbox, useListCollection, useFilter, Input, Group, Button, Field, Popover, Portal } from "@chakra-ui/react";


/**
 * Component for the user input when adding a new spool to the database.
 * i.e. on Brand, Material, Colour, Finish would have the dropdown when filling the inputs
 */




const SpoolAttributeInput = ({ inputLabel, list }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const { contains } = useFilter({ sensitivity: "base" })
    const { collection, filter } = useListCollection({
        initialItems: [
            { label: "React.js", value: "react" },
            { label: "Vue.js", value: "vue" },
            { label: "Angular", value: "angular" },
            { label: "Svelte", value: "svelte" },
            { label: "Next.js", value: "nextjs" },
            { label: "Nuxt.js", value: "nuxtjs" },
            { label: "Remix", value: "remix" },
            { label: "Gatsby", value: "gatsby" },
            { label: "Ember.js", value: "ember" },
            { label: "Preact", value: "preact" },
        ],
        filter: contains,
    })

    useEffect(() => {
        console.log(selectedItem);

    }, [selectedItem])

    return (
        <>

            <Listbox.Root maxW="XL" collection={collection} onSelect={(choice) => setSelectedItem(choice)}>
                <Listbox.Label>Select Framework</Listbox.Label>
                <Listbox.Input
                    as={Input}
                    placeholder="Type to filter or custom..."
                    onChange={(e) => filter(e.target.value)}
                    value={selectedItem ? selectedItem.value : ""}
                />
                <Listbox.Content maxH="200px">
                    {collection.items.map((attribute) => (
                        <Listbox.Item item={attribute} key={attribute.value}>
                            <Listbox.ItemText>{attribute.label}</Listbox.ItemText>
                            <Listbox.ItemIndicator />
                        </Listbox.Item>
                    ))}

                    <Listbox.Empty>Nothing found</Listbox.Empty>
                </Listbox.Content>
            </Listbox.Root>

        </>
    )
}
// getting the data back to the parent for later, but make a state in the parent, and pass those
// state setter functions as props
// for later : https://dev.to/bcostaaa01/how-to-pass-props-from-child-to-parent-component-in-react-1ci4
export default SpoolAttributeInput;