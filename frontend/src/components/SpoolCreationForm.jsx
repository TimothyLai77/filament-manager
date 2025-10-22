import { Button, Input, Stack, Card, Text, Field, Fieldset, Combobox, useListCollection, useFilter, Portal } from '@chakra-ui/react'
import { asyncNewSpoolAtom, newSpoolBaseAtom, finalSpoolArrayAtom, asyncSpoolAttributeAtom } from '@/atoms/atoms.js'
import { useAtom, atom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { Toaster, toaster } from "../components/ui/toaster";
import { Navigate, useNavigate } from 'react-router-dom';
import SpoolAttributeInput from './SpoolAttributeInput'
const SpoolCreationForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        material: '',
        colour: '',
        finish: '',
        initialWeight: 1000,
        cost: 0.0,
    });


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



    const handleChange = useCallback((field, value) => {
        setFormData(formData => ({
            ...formData, // copies the old fields
            [field]: value, // update target field with new value
        }));
    }, []);



    const generateFields = () => {
        return (

            <Fieldset.Root>
                <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input
                        onChange={(e) => handleChange('name', e.target.value)}
                        value={formData.name}
                    />
                    <SpoolAttributeInput inputLabel={'Brand'} updateForm={(value) => handleChange('brand', value)} list={['Bambu', 'eSun', 'Creality']} />
                    <SpoolAttributeInput inputLabel={'Material'} updateForm={(value) => handleChange('material', value)} list={['PLA', 'PETG', 'HT-PLA']} />
                    <SpoolAttributeInput inputLabel={'Colour'} updateForm={(value) => handleChange('colour', value)} list={['White', 'Black', 'Purple']} />
                    <SpoolAttributeInput inputLabel={'Finish'} updateForm={(value) => handleChange('finish', value)} list={['Matte', 'Silk', 'Galaxy']} />
                    <Field.Label>Initial Weight (g)</Field.Label>
                    <Input
                        onChange={(e) => handleChange('initalWeight', e.target.value)}
                        value={formData.initialWeight}
                    />

                    <Field.Label>Cost ($)</Field.Label>
                    <Input
                        onChange={(e) => handleChange('cost', e.target.value)}
                        value={formData.cost}
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