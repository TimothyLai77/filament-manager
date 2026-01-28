import { MdHome, MdInbox } from "react-icons/md";
import { Box, Card, Button, Text, Flex, HStack, Spacer } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";

const TopNavBar = () => {

    const navigate = useNavigate();
    return (
        <>
            <Box>
                <HStack margin={5}>
                    <Box>
                        <Button variant="plain" onClick={() => { navigate("/") }}>
                            <MdHome />
                            Home
                        </Button>
                    </Box>
                    <Spacer />
                    {/* <Box display="flex" justifyContent="flex-end">
                        <Button variant="plain" size="xs">Settings</Button>
                    </Box> */}
                    <Box>
                        <Button variant="plain" onClick={() => { navigate("/staged") }}>
                            <MdInbox />
                            Staged Jobs
                        </Button>
                    </Box>

                </HStack>

            </Box>
        </>
    );
}

export default TopNavBar;