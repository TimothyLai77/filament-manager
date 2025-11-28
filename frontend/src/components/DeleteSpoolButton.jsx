import {
    Button,
    Box,
    Dialog,
    Portal,
    CloseButton,
    Text
} from "@chakra-ui/react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import { Toaster, toaster } from "../components/ui/toaster";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { deleteSpool } from "@/features/spools/deleteSpool";

export const DeleteSpoolButton = () => {
    const spoolId = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleConfirm = async () => {
        try {
            await dispatch(deleteSpool(spoolId)).unwrap();
            // on success go back to home page
            navigate('/');
        } catch (rejectedValueOrSerializedError) {
            toaster.create({
                title: 'Error, somthing went wrong deleting the Spool',
                type: 'error',
            })
        }


        //dispatch(deleteSpool(spoolId));
        console.log('dispatch delete spool')
    }

    // do the dispatch.unwrap() and then navigate to '/' on completion
    // useEffect(() => {
    //     if (successMarkedFinished == null) return;
    //     if (successMarkedFinished) {
    //         navigate('/'); // when spool deleted go back to main page
    //     } else {
    //         console.log('spool did not mark as finished successfully')
    //     }
    // }, [successMarkedFinished])



    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button colorPalette='red'>
                    <MdOutlineDeleteForever />
                    Delete Spool & Jobs
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Confirm: Delete Spool and all Associated Jobs?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Text>
                                This will remove the spool from the database, and all of its associated jobs. This action is irrversable.
                            </Text>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button onClick={handleConfirm}>Delete Spool and Jobs</Button>
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