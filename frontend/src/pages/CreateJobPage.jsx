import { Button, Input, Stack, Card, Text, Field, Fieldset} from '@chakra-ui/react'
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import { selectedSpoolAtom }  from '../atoms.js'
import HomeButton from '..//components/HomeButton.jsx';
import SpoolDetailCard from '../components/SpoolDetailCard.jsx'
import JobCreationForm from '../components/JobCreationForm.jsx';
import { useEffect } from 'react';
const CreateJobPage = () => {
    const {spoolId} = useParams();
    const [,setSelectedSpool] = useAtom(selectedSpoolAtom);

    useEffect(() => {
        setSelectedSpool(spoolId);
    },[])

    return(
        <>
            <HomeButton />
            <Stack margin={5}>
                <SpoolDetailCard />
                <JobCreationForm />
            </Stack>


        </>
    )
}

export default CreateJobPage;