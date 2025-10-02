import { Button, Input, Stack, Card, Text, Field, Fieldset, Combobox, useListCollection, useFilter, Portal } from '@chakra-ui/react'
import { asyncNewSpoolAtom, newSpoolBaseAtom, finalSpoolArrayAtom, asyncSpoolAttributeAtom } from '@/atoms/atoms.js'
import { useAtom, atom } from 'jotai'
import { useEffect, useState } from 'react'
import { Toaster, toaster } from "../components/ui/toaster";
import { Navigate, useNavigate } from 'react-router-dom';

const SpoolCreationForm = () => {

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [material, setMaterial] = useState('');
    const [colour, setColour] = useState('');
    const [finish, setFinish] = useState('');
    const [initialWeight, setInitialWeight] = useState(1000);
    const [cost, setCost] = useState(0);
    const [spoolArray, refreshSpoolArray] = useAtom(finalSpoolArrayAtom)
    const [existingSpoolAttributes, refreshSpoolAttributes] = useAtom(asyncSpoolAttributeAtom);

    const [, setData] = useAtom(asyncNewSpoolAtom);
    // todo: hmmm i don't think this is the proper way... 
    const [newSpool, setNewSpool] = useAtom(newSpoolBaseAtom);
    const navigate = useNavigate();


    useEffect(() => {
        //console.log(newSpool)
        if (newSpool == null) return;

        // this is kinda ????? but I get a flush sync warning without the timer
        // just defers the rendering to the next cycle apparnetly?
        setTimeout(() => {
            if (newSpool instanceof Error) {
                toaster.create({
                    title: "Error",
                    description: `something went wrong: ` + newSpool.message,
                    type: "error"
                })
            } else {
                // clear the state so when navigating back to spool creation page it won't show
                // a toast
                setNewSpool(null);
                toaster.create({
                    title: "Success",
                    description: "New spool added to database.",
                    type: "success"
                });
                clearInputs();
                refreshSpoolArray();
            }
        }, 0);


    }, [newSpool])
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

    // for the elastic search, idk this is what chakra had for their combobox example
    const { contains } = useFilter({ sensitivity: "base" })
    const { collection, filter } = useListCollection({
        initialItems: frameworks,
        filter: contains,
    })

 
    const checkPayload = (payload) => {
        if (payload.name === '') return false;
        if (payload.brand === '') return false;
        if (payload.material === '') return false;
        if (payload.initialWeight <= 0 || isNaN(payload.initialWeight)) return false;
        if (payload.cost <= 0 || isNaN(payload.cost)) return false;
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: name,
            brand: brand,
            material: material,
            colour: colour,
            finish: finish ? finish : null,
            initialWeight: parseFloat(initialWeight),
            cost: parseFloat(cost)
        }
        if (checkPayload(payload)) {
            //console.log(payload)
            setData(payload)
        } else {
            console.log('form error')
            toaster.create({
                title: "Form Error",
                description: "double check fields",
                type: "error"
            })
        }
    }


    const clearInputs = () => {
        setName('');
        setBrand('');
        setMaterial('');
        setColour('');
        setFinish('');
        setInitialWeight(1000);
        setCost(0);
    }

    //todo: clean this up so its dynamically generated
    const generateFields = () => {
        return (
            <Fieldset.Root>
                <Combobox.Root
                    collection={collection}
                    onInputValueChange={(e) => filter(e.inputValue)}
                    width="320px"
                >
                    <Combobox.Label>Select framework</Combobox.Label>
                    <Combobox.Control>
                        <Combobox.Input placeholder="Type to search" />
                        <Combobox.IndicatorGroup>
                            <Combobox.ClearTrigger />
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
                <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />

                    <Field.Label>Brand</Field.Label>
                    <Input
                        onChange={(e) => setBrand(e.target.value)}
                        value={brand}
                    />

                    <Field.Label>Material</Field.Label>
                    <Input
                        onChange={(e) => setMaterial(e.target.value)}
                        value={material}
                    />

                    <Field.Label>Colour</Field.Label>
                    <Input
                        onChange={(e) => setColour(e.target.value)}
                        value={colour}
                    />

                    <Field.Label>Finish (optional)</Field.Label>
                    <Input
                        onChange={(e) => setFinish(e.target.value)}
                        value={finish}
                    />

                    <Field.Label>Initial Weight (g)</Field.Label>
                    <Input
                        onChange={(e) => setInitialWeight(e.target.value)}
                        value={initialWeight}
                    />

                    <Field.Label>Cost ($)</Field.Label>
                    <Input
                        onChange={(e) => setCost(e.target.value)}
                        value={cost}
                    />
                </Field.Root>
                <Button marginTop={5} type="submit" onClick={handleSubmit}>Submit</Button>
            </Fieldset.Root>
        );
    }




    return (
        <>
            <Card.Root margin={5}>
                <Card.Body>
                    <Card.Title>
                        <Text fontWeight="bold">Add New Filament</Text>
                    </Card.Title>
                    <Stack margin={5}>
                        {generateFields()}
                    </Stack>
                </Card.Body>
            </Card.Root>
            <Toaster />
        </>
    )
}

export default SpoolCreationForm;