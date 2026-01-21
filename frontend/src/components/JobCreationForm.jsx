import { Button, Input, Stack, Card, Text, Field, Fieldset } from '@chakra-ui/react'
import { Toaster, toaster } from "../components/ui/toaster";
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createJob } from '@/features/jobs/jobSlice';
import { commitStagedJob } from '@/features/stagedJobs/stagedJobSlice';
import { fetchSpoolById } from '@/features/spools/spoolSlice';
import SpoolSelector from './spoolComponents/SpoolSelector';
import { VARIANTS } from './SpoolList';


export const FORM_VARIANTS = {
    new: 'new',
    staged: 'staged'
};

// Check if payload is valid (no, empty fields, both amount used and cost are numbers)
const checkPayload = (payload) => {
    // idk there's probably a better way but my brain isn't working
    const spoolRegex = new RegExp("^(spool-).+$");
    if (!spoolRegex.test(payload.spoolId)) return false;
    if (payload.name === '' || payload.name === null) return false;
    if (payload.filamentAmountUsed <= 0 || isNaN(payload.filamentAmountUsed)) return false;
    if (isNaN(payload.cost)) return false;
    return true;
}



const JobCreationForm = ({ formType = FORM_VARIANTS.new, spoolDetails, jobDetails }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // react useStates for the form
    // todo: probably refactor this into a single object useState. like what is done in the spool creation.
    // if the job detail was passed as a prop then use those as the default values. else zero the fields
    const [name, setName] = jobDetails ? useState(jobDetails.name) : useState('');
    const [filamentAmount, setFilamentAmount] = jobDetails ? useState(jobDetails.filamentUsed) : useState('');
    const [cost, setCost] = useState(0);




    // use effect to auto calculate how much the job will cost (updates on 'filament amount' change) 
    useEffect(() => {
        setCost(costPerGram * filamentAmount);
    }, [filamentAmount, spoolDetails])



    // Get spool details and decide if the spool is able to be used (isEmpty is false)
    // and calcualte cost/g used
    const costPerGram = spoolDetails.cost / spoolDetails.initialWeight;
    const allowJobCreation = !spoolDetails.isEmpty



    // clear the input fields by changing the states
    const clearInputs = () => {
        setName('')
        setFilamentAmount('')
        setCost(0);
    }



    // send the dispatch for the commitstagedjob. 
    const handleCommit = async (e) => {
        e.preventDefault();
        const payload = {
            jobId: jobDetails.id,
            name: name,
            spoolId: spoolDetails.id,
            filamentAmountUsed: parseFloat(filamentAmount),
            cost: parseFloat(cost)
        }
        if (checkPayload(payload)) {
            // payload valid, try to submit and unwrap the promise from redux
            try {
                await dispatch(commitStagedJob(payload)).unwrap();
                // on success display sucess toast
                toaster.create({
                    title: "Success",
                    description: "New job commited to database.",
                    type: "success"
                });

                // go to the spool that was commited to
                navigate(`/details/${spoolDetails.id}`)
            } catch (rejectedValueOrSerializedError) {
                // something broke, display errror toast
                toaster.create({
                    title: "Error",
                    description: `something went wrong: ` + rejectedValueOrSerializedError,
                    type: "error"
                })
            }
            clearInputs()
        } else {
            // invalid payload, show toast
            toaster.create({
                title: "Form Error",
                description: "double check fields",
                type: "error"
            })
        }
    }


    // Handle submission of form, check the payload, and send the dispatch to redux also clear inputs.
    // will present a toast on form input errors
    // this function for when formtype is new (a new job is being created.)
    const handleCreate = async (e) => {
        e.preventDefault();
        const payload = {
            name: name,
            spoolId: spoolDetails.id,
            filamentAmountUsed: parseFloat(filamentAmount),
            cost: parseFloat(cost)
        }
        if (checkPayload(payload)) {
            // payload valid, try to submit and unwrap the promise from redux
            try {
                await dispatch(createJob(payload)).unwrap();
                // on success display sucess toast
                toaster.create({
                    title: "Success",
                    description: "New job added to database.",
                    type: "success"
                });
            } catch (rejectedValueOrSerializedError) {
                // something broke, display errror toast
                toaster.create({
                    title: "Error",
                    description: `something went wrong: ` + rejectedValueOrSerializedError,
                    type: "error"
                })
            }
            clearInputs()
        } else {
            // invalid payload, show toast
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
                {/* depending on what the form type is set to, call the respective form submission function. */}
                <Button marginTop={5} type="submit" onClick={formType === FORM_VARIANTS.new ? handleCreate : handleCommit}>Submit</Button>
            </Fieldset.Root>
        );
    }


    if (allowJobCreation) {
        return (
            <>
                <Card.Root minH="100%">
                    <Card.Body>
                        <Card.Title>
                            {
                                formType === FORM_VARIANTS.new ?
                                    <Text fontWeight="bold">Create New Job</Text>
                                    :
                                    <Text fontWeight="bold">Commit Staged Job</Text>
                            }

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