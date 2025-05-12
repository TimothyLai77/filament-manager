import { Box, Stack } from '@chakra-ui/react'
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { selectedSpoolAtom, showSpoolManagementButtonsAtom } from '../atoms.js'
import HomeButton from '..//components/HomeButton.jsx';
import SpoolDetailCard from '../components/SpoolDetailCard.jsx'
import JobCreationForm from '../components/JobCreationForm.jsx';
import { useEffect } from 'react';
const CreateJobPage = () => {
    const { spoolId } = useParams();
    const [, setSelectedSpool] = useAtom(selectedSpoolAtom);
    const [, setShowEditButton] = useAtom(showSpoolManagementButtonsAtom);
    useEffect(() => {
        setShowEditButton(false);
        setSelectedSpool(spoolId);
    }, [])

    return (
        <>
            <HomeButton />
            <Stack
                direction={{ base: 'column', lg: 'row' }} // column on mobile, row on md+
                spacing={4}
                margin={5}
                gap={5}
            >
                <Box flex={1}>
                    <SpoolDetailCard />
                </Box>

                <Box flex={1}>
                    <JobCreationForm />
                </Box>


            </Stack>
            <Stack margin={5}>

            </Stack>


        </>
    )
}

export default CreateJobPage;