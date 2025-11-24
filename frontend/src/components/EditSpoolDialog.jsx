import { Input, Fieldset, Field, Box, CloseButton, Dialog, Portal, Button } from '@chakra-ui/react'
import { MdModeEdit } from "react-icons/md";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSpool } from '@/features/spools/editSpoolSlice';

const EditSpoolDialog = () => {

    const dispatch = useDispatch();
    const { spoolDetails, loading, error } = useSelector((state) => state.spools)

    // todo: probably should just be a single useState object.
    const [name, setName] = useState(spoolDetails.name);
    const [brand, setBrand] = useState(spoolDetails.brand);
    const [material, setMaterial] = useState(spoolDetails.material);
    const [colour, setColour] = useState(spoolDetails.colour);
    // finish can be optional, and null values in inputs are not good
    const [finish, setFinish] = useState(spoolDetails.finish !== null ? spoolDetails.finish : '');
    const [initialWeight, setInitialWeight] = useState(spoolDetails.initialWeight);
    const [cost, setCost] = useState(spoolDetails.cost);
    const [filamentUsed, setFilamentUsed] = useState(spoolDetails.filamentUsed)


    if (loading) return <h1>loading...</h1>
    if (error) return <h1>error</h1>


    // verify the payload 
    const verifyPayload = (payload) => {
        if (payload.name === '') return false;
        if (payload.brand === '') return false;
        if (payload.colour === '') return false;
        if (payload.material === '') return false;
        // allow finish to be empty string
        // shouldn't allow new initial weight be less than what is left
        if (payload.cost <= 0 || isNaN(payload.cost)) return false;

        console.log(initialWeight < filamentUsed)

        if (isNaN(payload.initialWeight)) return false;
        if (isNaN(payload.filamentUsed)) return false;
        if (payload.initialWeight < payload.filamentUsed) return false;
        return true;
    }

    const handleSave = () => {
        console.log(spoolDetails)
        const payload = {
            id: spoolDetails.id,
            name: name,
            brand: brand,
            material: material,
            colour: colour,
            finish: finish,
            initialWeight: parseFloat(initialWeight),
            cost: parseFloat(cost),
            filamentUsed: parseFloat(filamentUsed)
        }
        if (verifyPayload(payload)) {
            //console.log('valid payload')
            dispatch(editSpool(payload))
        } else {
            console.log('invalid payload', payload);
        }
    }

    const form = () => {
        return (
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

    return (
        <Dialog.Root size="xl" initialFocusEl="null">
            <Dialog.Trigger asChild>
                <Box>
                    <Button><MdModeEdit />Edit Spool</Button>
                </Box>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Edit Spool: {`${spoolDetails.name}`}</Dialog.Title>
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