import { Button, Input, Stack, Card, Text, Field, Fieldset } from '@chakra-ui/react'
import { Toaster, toaster } from "../components/ui/toaster";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { createJob } from '@/features/jobs/jobSlice';
import { fetchSpoolById } from '@/features/spools/spoolSlice';


const checkPayload = (payload) => {
    // idk there's probably a better way but my brain isn't working
    const spoolRegex = new RegExp("^(spool-).+$");
    if (!spoolRegex.test(payload.spoolId)) return false;
    if (payload.name === '' || payload.name === null) return false;
    if (payload.filamentAmountUsed <= 0 || isNaN(payload.filamentAmountUsed)) return false;
    if (isNaN(payload.cost)) return false;
    return true;
}


const JobCreationForm = () => {
    const dispatch = useDispatch();
    const { spoolDetails, loading, error } = useSelector((state) => state.spools);
    const { submittedJob } = useSelector((state) => state.jobs);

    // react useStates for the form
    // todo: probably refactor this into a single object useState. like what is done in the spool creation.
    const [name, setName] = useState('');
    const [filamentAmount, setFilamentAmount] = useState('');
    const [cost, setCost] = useState(0);



    // use effect to auto calculate how much the job will cost (updates on 'filament amount' change) 
    useEffect(() => {
        setCost(costPerGram * filamentAmount);
    }, [filamentAmount, spoolDetails])


    // use effect for toast on job submit
    useEffect(() => {
        //console.log(newSpool)
        if (submittedJob == null) return;

        // this is kinda ????? but I get a flush sync warning without the timer
        // just defers the rendering to the next cycle apparnetly?
        setTimeout(() => {
            if (submittedJob instanceof Error) {
                toaster.create({
                    title: "Error",
                    description: `something went wrong: ` + submittedJob.message,
                    type: "error"
                })
            } else {
                // dispatch a fetch request to the spool detials to refresh the data.
                dispatch(fetchSpoolById(spoolDetails.id));

                toaster.create({
                    title: "Success",
                    description: "New job added to database.",
                    type: "success"
                });

            }
        }, 0);


    }, [submittedJob])

    // wait for redux store loads
    if (loading) return <h1>loading...</h1>
    if (error) return <h1>error</h1>

    // Get spool details and decide if the spool is able to be used (isEmpty is false)
    // and calcualte cost/g used
    const costPerGram = spoolDetails.cost / spoolDetails.initialWeight;
    const allowJobCreation = !spoolDetails.isEmpty




    const clearInputs = () => {
        setName('')
        setFilamentAmount('')
        setCost(0);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: name,
            spoolId: spoolDetails.id,
            filamentAmountUsed: parseFloat(filamentAmount),
            cost: parseFloat(cost)
        }
        console.log(payload);
        if (checkPayload(payload)) {
            // actual form submission
            dispatch(createJob(payload));
            clearInputs()
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