import {NumberInput, Button, Input, Stack, Card, Text, Field, Fieldset} from '@chakra-ui/react'
import SpoolCreationForm from '../components/SpoolCreationForm';
import HomeButton from '../components/HomeButton.jsx';
const CreateSpoolPage = () => {

  return (
    <>
        <HomeButton />
        <SpoolCreationForm />
    </>
  )
}

export default CreateSpoolPage;