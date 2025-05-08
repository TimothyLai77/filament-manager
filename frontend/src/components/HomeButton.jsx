import { MdHome } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";
const HomeButton = () => {
    const navigate = useNavigate();
    return (
        <>
            <Button onClick={() => {navigate("/")}}>
                <MdHome />
                Home
            </Button>
        </>
    );
}

export default HomeButton;