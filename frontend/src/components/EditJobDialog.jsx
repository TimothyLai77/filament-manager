import { Input, Fieldset, Field, Box, CloseButton, Dialog, Portal, Button } from '@chakra-ui/react'
import { MdModeEdit } from "react-icons/md";
import { useAtom } from 'jotai';
import { asyncPutSpoolEditAtom, loadableSelectedSpoolDetailsAtom } from '../atoms'
import { useState } from 'react';
const EditJobDialog = () => {
    const [spool] = useAtom(loadableSelectedSpoolDetailsAtom);
    if (spool.state === 'loading') {
        return (
            <h1>Loading...</h1>
        );
    }
    if (spool.state === 'hasError') {
        return (
            <h1>Error</h1>
        )
    }
    const spoolData = spool.data
    const [name, setName] = useState();
    const [filamentUsed, setFilamentUsed] = useState();
    const [cost, setCost] = useState();


    // pain
    const verifyPayload = (payload) => {

    }

    const handleSave = () => {
        const payload = {}
        if (verifyPayload(payload)) {
            //console.log('valid payload')
            setPayload(payload)
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

                    <Field.Label>Filament Used</Field.Label>
                    <Input
                        onChange={(e) => setFilamentUsed(e.target.value)}
                        value={filamentUsed}
                    />

                    <Field.Label>Cost</Field.Label>
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
                    <Button size="xs"><MdModeEdit />Edit Job</Button>
                </Box>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Edit Job: {`${spoolData.name}`}</Dialog.Title>
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

export default EditJobDialog;