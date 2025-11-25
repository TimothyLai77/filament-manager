import { Button, Input, Stack, Card, Text, Field, Fieldset, Combobox, useListCollection, useFilter, Portal } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { Toaster, toaster } from "../components/ui/toaster";
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SpoolAttributeInput from './SpoolAttributeInput'
import { createSpool } from '@/features/spools/createSpoolSlice';
import { fetchSpoolAttributes } from '@/features/spools/spoolAttributesSlice';
const SpoolCreationForm = () => {
    const dispatch = useDispatch();
    const { spoolAttributes, loading, error } = useSelector((state) => state.spoolAttributes)
    const defaultFormData = {
        name: '',
        brand: '',
        material: '',
        colour: '',
        finish: '',
        initialWeight: 1000,
        cost: 0.0,
    }

    const [formData, setFormData] = useState(defaultFormData);


    const navigate = useNavigate();


    // useEffect(() => {
    //     //console.log(newSpool)
    //     if (newSpool == null) return;


    //     // this is kinda ????? but I get a flush sync warning without the timer
    //     // just defers the rendering to the next cycle apparnetly?
    //     setTimeout(() => {
    //         if (newSpool instanceof Error) {
    //             toaster.create({
    //                 title: "Error",
    //                 description: `something went wrong: ` + newSpool.message,
    //                 type: "error"
    //             })
    //         } else {
    //             // clear the state so when navigating back to spool creation page it won't show
    //             // a toast
    //             setNewSpool(null);
    //             toaster.create({
    //                 title: "Success",
    //                 description: "New spool added to database.",
    //                 type: "success"
    //             });
    //             // clearInputs();
    //             refreshSpoolAttributes();
    //             refreshSpoolArray();
    //         }
    //     }, 0);


    // }, [newSpool])

    // fetch spool attributes
    useEffect(() => {
        dispatch(fetchSpoolAttributes())
    }, [dispatch])





    const checkPayload = (payload) => {
        if (payload.name === '') return false;
        if (payload.brand === '') return false;
        if (payload.material === '') return false;
        if (payload.initialWeight <= 0 || isNaN(payload.initialWeight)) return false;
        if (payload.cost <= 0 || isNaN(payload.cost)) return false;
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // this is kinda stupid, the formData state already has everything, but i don't know when to parse the final weight and cost
        // so im just putting it in another object and checking then.
        const payload = {
            name: formData.name,
            brand: formData.brand,
            material: formData.material,
            colour: formData.colour,
            finish: formData.finish != '' ? formData.finish : null,
            initialWeight: parseFloat(formData.initialWeight),
            cost: parseFloat(formData.cost)
        }
        if (checkPayload(payload)) {
            //console.log(payload)
            // dispatch the payload to redux

            // no idea if this is right or not 
            // https://redux-toolkit.js.org/api/createAsyncThunk#unwrapping-result-actions
            try {
                const dispatchResult = await dispatch(createSpool(payload)).unwrap()
                toaster.create({
                    title: "Success",
                    description: "New spool added to database.",
                    type: "success"
                });
            } catch (rejectedValueOrSerializedError) {
                toaster.create({
                    title: "Error",
                    description: `something went wrong: ` + newSpool.message,
                    type: "error"
                })
                console.log(dispatchResult)
            }



        } else {
            console.log('form error')
            toaster.create({
                title: "Form Error",
                description: "double check fields",
                type: "error"
            })
        }
    }

    // TODO: uh this wont work, i need to clear the <input> in the SpoolAttributeInput component
    const clearInputs = () => {
        setFormData(defaultFormData);
    }



    const handleChange = useCallback((field, value) => {
        setFormData(formData => ({
            ...formData, // copies the old fields
            [field]: value, // update target field with new value
        }));
    }, []);

    // wait for redux 
    if (loading || spoolAttributes.length < 1) return <h1>loading...</h1>
    if (error) return <h1>error</h1>




    return (
        <>
            <Card.Root margin={5}>
                <Card.Body>
                    <Card.Title>
                        <Text fontWeight="bold">Add New Filament</Text>
                    </Card.Title>
                    <Stack margin={5}>
                        <Fieldset.Root>
                            <Field.Root>
                                <Field.Label>Name</Field.Label>
                                <Input
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    value={formData.name}
                                />
                                <SpoolAttributeInput inputLabel={'Brand'} updateForm={(value) => handleChange('brand', value)} list={spoolAttributes.brands} />
                                <SpoolAttributeInput inputLabel={'Material'} updateForm={(value) => handleChange('material', value)} list={spoolAttributes.materials} />
                                <SpoolAttributeInput inputLabel={'Colour'} updateForm={(value) => handleChange('colour', value)} list={spoolAttributes.colours} />
                                <SpoolAttributeInput inputLabel={'Finish'} updateForm={(value) => handleChange('finish', value)} list={spoolAttributes.finishes} />
                                <Field.Label>Initial Weight (g)</Field.Label>
                                <Input
                                    onChange={(e) => handleChange('initalWeight', e.target.value)}
                                    value={formData.initialWeight}
                                />

                                <Field.Label>Cost ($)</Field.Label>
                                <Input
                                    onChange={(e) => handleChange('cost', e.target.value)}
                                    value={formData.cost}
                                />
                            </Field.Root>

                            <Button marginTop={5} type="submit" onClick={handleSubmit}>Submit</Button>
                        </Fieldset.Root>
                    </Stack>
                </Card.Body>
            </Card.Root>
            <Toaster />
        </>
    )
}

export default SpoolCreationForm;