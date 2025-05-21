import {
    Button,
    Box,
    Dialog,
    Portal,
    CloseButton,
    Text
} from "@chakra-ui/react";
import { MdCheck } from "react-icons/md"
import { useAtom } from "jotai";
import { markSpoolAsFinishedAtom, finalSelectedSpoolAtom, selectedSpoolAtom } from "@/atoms/atoms";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const MarkSpoolAsFinishedButton = () => {
    const navigate = useNavigate()
    const [spool] = useAtom(finalSelectedSpoolAtom);
    const [, markSpool] = useAtom(markSpoolAsFinishedAtom);
    const [, setSelectedSpool] = useAtom(selectedSpoolAtom)
    const handleConfirm = async () => {

        if ((await markSpool(spool.data.id)).isEmpty) {
            // setSelectedSpool('') // set selected spool to none.
            navigate('/') // go back
        } else {
            console.log('pain')
        }

    }


    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <Button>
                    <MdCheck />
                    Mark spool as Finished
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Confirm: Mark Spool as Finished?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Text>
                                This will remove the spool from the list and the action is unreversable.
                            </Text>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button onClick={handleConfirm}>Mark spool as Finished</Button>
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

export default MarkSpoolAsFinishedButton;