import { Button, Input, Stack, Card, Text, Field, Fieldset} from '@chakra-ui/react'
import { asyncNewSpoolAtom,newSpoolBaseAtom } from '../atoms.js'
import { useAtom, atom } from 'jotai'
import { useEffect, useState } from 'react'
import { Toaster, toaster } from "../components/ui/toaster";
import HomeButton from '..//components/HomeButton.jsx';
import SpoolDetailCard from '../components/SpoolDetailCard.jsx'
const JobCreationForm = () => {
    return(
        <>
            <HomeButton />
            <Stack margin={5}>
                <SpoolDetailCard />
            </Stack>


        </>
    )
}

export default JobCreationForm;