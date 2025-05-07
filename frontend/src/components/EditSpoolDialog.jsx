import {Input,Fieldset,Field,Box,CloseButton, Dialog, Portal,Button} from '@chakra-ui/react'
import { MdModeEdit } from "react-icons/md";
import { useAtom } from 'jotai';
import { loadableSelectedSpoolDetailsAtom} from '../atoms'
import SpoolEditForm from './SpoolEditForm';

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
                    <SpoolEditForm spoolData={spoolData}/>
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