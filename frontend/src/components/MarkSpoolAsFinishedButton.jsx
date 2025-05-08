import { 
    Button,
    Box,
    Dialog,
    Portal,
    CloseButton,
    Text
 } from "@chakra-ui/react";
import { MdCheck } from "react-icons/md"
const MarkSpoolAsFinishedButton = () => {
    return(
        <Dialog.Root>
            <Dialog.Trigger asChild>
            <Button>
                <MdCheck / >
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
                <Button>Mark spool as Finished</Button>
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