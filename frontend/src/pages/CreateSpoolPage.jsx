import {NumberInput, Button, Input, Stack, Card, Text, Field} from '@chakra-ui/react'
import { newSpoolSendAtom, newSpoolAtom } from '../atoms.js'
import { useAtom } from 'jotai'
const CreateSpoolPage = () => {

    const [,setData] = useAtom(newSpoolSendAtom);
    const [getNewSpool] = useAtom(newSpoolAtom);
    const onClick = () => {
        setData({"placeholder": "placeholder"});
       
    }

    const generateFields = () => {
        const fields = [
            {"fieldText":"Name","type": String, "placeholder": "Prusament Matte Black"},
            {"fieldText":"Brand","type": String, "placeholder": "Prusament"},
            {"fieldText":"Material","type": String, "placeholder": "PLA",}, 
            {"fieldText":"Colour","type" : String, "placeholder": "black"},
            {"fieldText":"Finish (Optional)","type": String, "placeholder": "matte"},
            {"fieldText":"Initial Weight (g)","type": Number, "defaultValue": 1000},
            {"fieldText":"Cost ($)","type": Number}
        ];

     

        return(     
            fields.map((field, index) => (
                <Field.Root key={index}>
                    <Field.Label >{field.fieldText}</Field.Label>
                    {field.type === String ? 
                    <Input placeholder={field.placeholder}></Input> : 
                    <NumberInput.Root minWidth="100%">
                        <NumberInput.Input defaultValue={field.defaultValue}/>
                    </NumberInput.Root>
                }
                </Field.Root>
            )) 
        )
    }



  return (
    <>
        <Card.Root margin={5}>
            <Card.Body>
                <Card.Title>
                    <Text fontWeight="bold">Add New Filament</Text>
                </Card.Title>
                <Stack margin={5}>
                    {generateFields()}
            
                    <Button marginTop={5} onClick={onClick}>Submit</Button>
                </Stack>
            </Card.Body>
        </Card.Root>
    </>
  )
}

export default CreateSpoolPage;