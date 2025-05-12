import { Button, Input, Stack, Card, Text, Field, Fieldset } from '@chakra-ui/react'
import { asyncNewSpoolAtom, newSpoolBaseAtom } from '../atoms.js'
import { useAtom, atom } from 'jotai'
import { useEffect, useState } from 'react'
import { Toaster, toaster } from "../components/ui/toaster";
import { finalSelectedSpoolAtom, newJobBaseAtom, asyncNewJobAtom, loadableSelectedSpoolDetailsAtom } from '../atoms.js';
import SpoolDetailCard from './SpoolDetailCard.jsx';
const JobCreationForm = () => {

    const [name, setName] = useState('');
    const [spoolDetails, refreshSpool] = useAtom(finalSelectedSpoolAtom)
    const [filamentAmount, setFilamentAmount] = useState('');
    const [cost, setCost] = useState(0);


    const [, setData] = useAtom(asyncNewJobAtom);
    // todo: hmmm i don't think this is the proper way... 
    const [newJob] = useAtom(newJobBaseAtom);

    let costPerGram = 0;
    let allowJobCreation = false;
    if (spoolDetails.state === 'hasData') {
        costPerGram = spoolDetails.data.cost / spoolDetails.data.initialWeight;
        if (!spoolDetails.data.isEmpty) allowJobCreation = true;
    }


    useEffect(() => {
        setCost(costPerGram * filamentAmount);
    }, [filamentAmount])


    useEffect(() => {
        //console.log(newSpool)
        if (newJob == null) return;

        // this is kinda ????? but I get a flush sync warning without the timer
        // just defers the rendering to the next cycle apparnetly?
        setTimeout(() => {
            if (newJob instanceof Error) {
                toaster.create({
                    title: "Error",
                    description: `something went wrong: ` + newJob.message,
                    type: "error"
                })
            } else {
                toaster.create({
                    title: "Success",
                    description: "New job added to database.",
                    type: "success"
                });
                refreshSpool()
                clearInputs()
            }
        }, 0);


    }, [newJob])

    const checkPayload = (payload) => {
        // idk there's probably a better way but my brain isn't working
        const spoolRegex = new RegExp("^(spool-).+$");
        if (!spoolRegex.test(payload.spoolId)) return false;
        if (payload.name === '' || payload.name === null) return false;
        if (payload.filamentAmountUsed <= 0 || isNaN(payload.filamentAmountUsed)) return false;
        if (isNaN(payload.cost)) return false;
        return true;
    }
    const clearInputs = () => {
        setName('')
        setFilamentAmount('')
        setCost(0);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: name,
            spoolId: spoolDetails.data.id,
            filamentAmountUsed: parseFloat(filamentAmount),
            cost: parseFloat(cost)
        }
        console.log(payload);
        if (checkPayload(payload)) {
            setData(payload);
        } else {
            console.log('form error')
            toaster.create({
                title: "Form Error",
                description: "double check fields",
                type: "error"
            })
        }
    }




    //todo: clean this up so its dynamically generated
    const generateFields = () => {
        return (
            <Fieldset.Root>
                <Field.Root>
                    <Field.Label>Job Name</Field.Label>
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />

                    <Field.Label>Filament Amount</Field.Label>
                    <Input
                        onChange={(e) => setFilamentAmount(e.target.value)}
                        value={filamentAmount}
                    />

                    <Field.Label>{`Cost (override if needed)`}</Field.Label>
                    <Input
                        onChange={(e) => setCost(e.target.value)}
                        value={cost}
                    />
                </Field.Root>
                <Button marginTop={5} type="submit" onClick={handleSubmit}>Submit</Button>
            </Fieldset.Root>
        );
    }


    if (allowJobCreation) {
        return (
            <>
                <Card.Root minH="100%">
                    <Card.Body>
                        <Card.Title>
                            <Text fontWeight="bold">Create New Job</Text>
                        </Card.Title>
                        <Stack margin={5}>
                            {generateFields()}
                        </Stack>
                    </Card.Body>
                </Card.Root>
                <Toaster />
            </>
        )
    }


}

export default JobCreationForm;