import {Input,Fieldset,Field,Box,CloseButton, Dialog, Portal,Button} from '@chakra-ui/react'
import { MdModeEdit } from "react-icons/md";
import { useAtom } from 'jotai';
import { editSpoolPayloadAtom,loadableSelectedSpoolDetailsAtom} from '../atoms'
import { useState } from 'react';
const EditSpoolDialog = () => {
    const [spool] = useAtom(loadableSelectedSpoolDetailsAtom);
    if(spool.state === 'loading'){
        return (
            <h1>Loading...</h1>
        );
    }
    if(spool.state === 'hasError'){
        return (
            <h1>Error</h1>
        )
    }
    const spoolData = spool.data

    const [name, setName] = useState(spoolData.name);
    const [brand, setBrand] = useState(spoolData.brand);
    const [material, setMaterial] = useState(spoolData.material);
    const [colour, setColour] = useState(spoolData.colour);
    // finish can be optional, and null values in inputs are not good
    const [finish, setFinish] = useState(spoolData.finish !== null ? spoolData.finish : '');
    const [initialWeight, setInitialWeight] = useState(spoolData.initialWeight);
    const [cost, setCost] = useState(spoolData.cost);
    const [filamentUsed, setFilamentUsed] = useState(spoolData.filamentUsed)
    
    const [,setPayload] = useAtom(editSpoolPayloadAtom);

    // pain
    const verifyPayload = (payload) => {
        if(payload.name === '') return false;
        if(payload.brand === '') return false;
        if(payload.colour === '') return false;
        if(payload.material === '') return false;
        // allow finish to be empty string
        // shouldn't allow new initial weight be less than what is left
        if(payload.cost <= 0 || isNaN(payload.cost)) return false;
        if(initialWeight < filamentUsed) return false;
        if(filamentUsed > initialWeight) return false; // im having a brain fart this is redundant??
        return true;
    }

    const handleSave = () => {
        const payload = {
            name: name,
            brand: brand,
            material: material,
            colour: colour,
            finish: finish,
            initialWeight: initialWeight,
            cost: parseFloat(cost),
            filamentUsed: filamentUsed
        }
        if(verifyPayload(payload)){
            console.log('valid payload')
        }else{
            console.log('invalid payload', payload)
        }
    }

    const form = () => {
        return(
                <Fieldset.Root>
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

                        <Field.Label>Filament Used (g)</Field.Label>
                        <Input
                            onChange={(e) => setFilamentUsed(e.target.value)}
                            value={filamentUsed}
                        />

                    <Field.Label>Cost ($)</Field.Label>
                        <Input
                            onChange={(e) => setCost(e.target.value)}
                            value={cost}
                        />
                    </Field.Root>
                </Fieldset.Root>

        
        );        
    }

    return(
        <Dialog.Root size="xl">
        <Dialog.Trigger asChild>
                <Box display="flex" justifyContent="flex-end">
                    <Button><MdModeEdit/>Edit Spool</Button>
                </Box>
        </Dialog.Trigger>
        <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
            <Dialog.Content>
                <Dialog.Header>
                <Dialog.Title>Edit Spool: {`${spoolData.name}`}</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                    {form()}
                </Dialog.Body>
                <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button type='submit' onClick={handleSave}>Save</Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
                </Dialog.CloseTrigger>
            </Dialog.Content>
            </Dialog.Positioner>
        </Portal>
        </Dialog.Root>
    )
    }

export default EditSpoolDialog;