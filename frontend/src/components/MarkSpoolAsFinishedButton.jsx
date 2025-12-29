import {
    Button,
    Box,
    Dialog,
    Portal,
    CloseButton,
    Text
} from "@chakra-ui/react";
import { MdCheck } from "react-icons/md"
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { markSpoolAsFinished } from "@/features/spools/markSpoolFinishedSlice";
const MarkSpoolAsFinishedButton = () => {
    const spoolId = useParams();
    const dispatch = useDispatch();
    const { successMarkedFinished, loading, error } = useSelector((state) => state.markSpoolFinished)
    const navigate = useNavigate()
    const handleConfirm = async () => {
        console.log('handle confirm run')
        try {
            // dispatch the call. unwrap the result. if there is no error navigatge back to the root page
            await dispatch(markSpoolAsFinished(spoolId)).unwrap();
            navigate('/')
        } catch (rejectedValueOrSerializedError) {
            // idk what to do...
            console.log('ERROR: spool did not mark as finished')
        }

    }


    if (loading) return <></>
    if (error) return <h1>error</h1>


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