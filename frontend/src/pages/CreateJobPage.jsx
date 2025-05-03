import { Button, Input, Stack, Card, Text, Field, Fieldset} from '@chakra-ui/react'
import { asyncNewSpoolAtom,newSpoolBaseAtom } from '../atoms.js'
import { useAtom, atom } from 'jotai'
import { useEffect, useState } from 'react'
import { Toaster, toaster } from "../components/ui/toaster";
import HomeButton from '..//components/HomeButton.jsx';
import SpoolDetailCard from '../components/SpoolDetailCard.jsx'
import JobCreationForm from '../components/JobCreationForm.jsx';
const CreateJobPage = () => {
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