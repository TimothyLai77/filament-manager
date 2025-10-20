import { useEffect, useState } from "react";
import { createListCollection, Listbox, useListCollection, useFilter, Input, Group, Button, Field, Popover, Portal } from "@chakra-ui/react";


/**
 * Component for the user input when adding a new spool to the database.
 * i.e. on Brand, Material, Colour, Finish would have the dropdown when filling the inputs
 */


// this is stupid
const formatInputArray = (array) => {
    // convert the string array into objects for the collection
    const itemArray = []
    array.forEach(element => {
        itemArray.push({
            label: `${element}`, value: `${element}` // really dumb, but i just have a simple list.
        })
    });
    return itemArray;
}


const SpoolAttributeInput = ({ inputLabel, list }) => {
    // todo: remove later, this was just for testing. also make sure to change the input array back to passed prop
    const tempList = ["PLA", "PETG", "HT-PLA", "ABS"]

    const [isFocused, setFocus] = useState(false)
    const [inputValue, setInputValue] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const { contains } = useFilter({ sensitivity: "base" })

    // I really don't like having to create a collection for the list to work, but the alternative is to get chakra's listbox
    // to work using arrays which is even more pain. esp. with filters and what not.
    const { collection, filter } = useListCollection({
        initialItems: formatInputArray(tempList),
        filter: contains,
    })

    useEffect(() => {
        console.log(selectedItem);

    }, [selectedItem])


    // Handle input changes
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        filter(value);
    };

    // Handle item selection
    const handleSelect = (choice) => {
        setSelectedItem(choice);
        setInputValue(choice.value);
        setFocus(false)
    };

    const handleFocus = () => {
        setFocus(true)
    }



    const handleBlur = () => {
        setFocus(false)
    }

    return (
        <>

            <Listbox.Root maxW="XL" collection={collection} onSelect={handleSelect}>
                <Listbox.Label>{inputLabel}</Listbox.Label>
                <Listbox.Input
                    as={Input}
                    placeholder="Type to filter or custom..."
                    onChange={handleInputChange}
                    value={inputValue}
                    onFocus={handleFocus}
                    onFocusOut={handleBlur}
                />
                {
                    // only render the drop down menu when the input is in focus
                    isFocused ?
                        (<Listbox.Content maxH="200px">
                            {collection.items.map((attribute) => (
                                <Listbox.Item item={attribute} key={attribute.value}>
                                    <Listbox.ItemText>{attribute.label}</Listbox.ItemText>

                                </Listbox.Item>
                            ))}

                            <Listbox.Empty>Nothing found. {`Creating '${inputValue}'`}</Listbox.Empty>
                        </Listbox.Content>
                        ) :
                        // else render nothing
                        <></>
                }
            </Listbox.Root>

        </>
    )
}
// getting the data back to the parent for later, but make a state in the parent, and pass those
// state setter functions as props
// for later : https://dev.to/bcostaaa01/how-to-pass-props-from-child-to-parent-component-in-react-1ci4
export default SpoolAttributeInput;