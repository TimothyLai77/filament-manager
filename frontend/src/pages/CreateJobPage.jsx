import { Box, Stack } from '@chakra-ui/react'

import { useParams } from 'react-router-dom';

import TopNavBar from '../components/TopNavBar.jsx';
import SpoolDetailCard from '../components/SpoolDetailCard.jsx'
import JobCreationForm from '../components/JobCreationForm.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSpoolById } from '@/features/spools/spoolSlice.js';
const CreateJobPage = () => {
    const { spoolId } = useParams();
    const dispatch = useDispatch();

    //const [, setSelectedSpool] = useAtom(selectedSpoolAtom);
    //todo: i have no idea what the show edit button atom was for?
    //const [, setShowEditButton] = useAtom(showSpoolManagementButtonsAtom);
    // useEffect(() => {
    //     setShowEditButton(false);
    //     setSelectedSpool(spoolId);
    // }, [])

    useEffect(() => {
        // top level dispatch to get the spooldetails
        // if user ever went to site/create-spoo/spoolId directly
        dispatch(fetchSpoolById(spoolId));
    }, [dispatch])


    return (
        <>
            <TopNavBar />
            <Stack
                direction={{ base: 'column', lg: 'row' }} // column on mobile, row on md+
                spacing={4}
                margin={5}
                gap={5}
            >
                {/* left side that re-displays the the spool details */}
                <Box flex={1}>
                    <SpoolDetailCard />

                </Box>
                {/* right side shows the job creation form */}
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