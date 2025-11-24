import { Tag, Text, Input, Fieldset, Field, Box, CloseButton, Dialog, Portal, Button } from '@chakra-ui/react'
import { MdModeEdit } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editJob } from '@/features/jobs/editJobSlice';
import { fetchSpoolById } from '@/features/spools/spoolSlice';
import { fetchJobListById } from '@/features/jobs/jobSlice';
const EditJobDialog = ({ job }) => {
    const dispatch = useDispatch();
    const { editSuccess } = useSelector((state) => state.editJobs)
    const { spoolDetails, loading, error } = useSelector((state) => state.spools)
    // todo: change this into a single useState object
    const [name, setName] = useState(job.name);
    const [filamentUsed, setFilamentUsed] = useState(job.filamentAmountUsed);
    const [cost, setCost] = useState(job.cost);

    // create a copy of the job passed from props
    const initialValues = {
        name: job.name,
        filamentAmountUsed: job.filamentAmountUsed,
        cost: job.cost
    };

    let costPerGram = 0.0;


    // on cancel reset the values ot the original values before any edits
    const resetFields = () => {
        setName(initialValues.name);
        setFilamentUsed(initialValues.filamentAmountUsed)
        setCost(initialValues.cost);
    }

    // update the price when amount is changed
    useEffect(() => {
        setCost(costPerGram * filamentUsed);
    }, [filamentUsed])



    if (loading) return <></>
    if (error) return <></>
    costPerGram = spoolDetails.cost / spoolDetails.initialWeight;
    const verifyPayload = (payload) => {
        if (payload.jobId == '' || !payload.jobId) return false;
        if (payload.name == '') return false;
        if (payload.filamentAmountUsed < 0.0 || isNaN(payload.filamentAmountUsed)) return false;
        if (payload.cost < 0.0 || isNaN(payload.cost)) return false;
        return true;
    }

    const handleSave = async () => {
        const payload = {
            jobId: job.id,
            name: name,
            filamentAmountUsed: parseFloat(filamentUsed),
            cost: parseFloat(cost)
        }
        if (verifyPayload(payload)) {
            console.log('valid payload')

            // dispatch the edit job
            dispatch(editJob(payload))
            //todo: With the old state library, I had it reset the fields on error
            // never put it back with redux, so maybe one day. 
        } else {
            console.log('invalid payload', payload);
        }

    }

    const form = () => {
        return (
            <Fieldset.Root marginTop={5}>
                <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />

                    <Field.Label>Filament Used</Field.Label>
                    <Input
                        onChange={(e) => setFilamentUsed(e.target.value)}
                        value={filamentUsed}
                    />

                    <Field.Label>Cost (override if needed)</Field.Label>
                    <Input
                        onChange={(e) => setCost(e.target.value)}
                        value={cost}
                    />

                </Field.Root>
            </Fieldset.Root>


        );
    }

    return (
        <Dialog.Root size="xl" initialFocusEl="null" onExitComplete={resetFields}>
            <Dialog.Trigger asChild>
                <Box>
                    <Button size="xs"><MdModeEdit />Edit Job</Button>
                </Box>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Edit Job: {`${job.name}`}</Dialog.Title>
                            <Tag.Root>
                                <Tag.Label>
                                    {job.id}
                                </Tag.Label>
                            </Tag.Root>
                        </Dialog.Header>
                        <Dialog.Body>

                            <Text>Cost/Gram : ${costPerGram}</Text>
                            {form()}
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button type='submit' onClick={handleSave}>Save</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default EditJobDialog;