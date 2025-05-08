import { 
    Button,
    Box,

 } from "@chakra-ui/react";
import { MdCheck } from "react-icons/md"
const MarkSpoolAsFinishedButton = () => {
    return(
            <Button>
                <MdCheck / >
                Mark spool as Finished
            </Button>

    )

}

export default MarkSpoolAsFinishedButton;