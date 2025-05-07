import {Box,CloseButton, Dialog, Portal,Button} from '@chakra-ui/react'
import { MdModeEdit } from "react-icons/md";
import { useAtom } from 'jotai';
import { loadableSelectedSpoolDetailsAtom} from '../atoms'

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
    //console.log(spoolData)
    const percentLeft = spoolData.filamentLeft/spoolData.initialWeight*100
    const costPerGram = spoolData.cost / spoolData.initialWeight




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
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                </Dialog.Body>
                <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button>Save</Button>
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