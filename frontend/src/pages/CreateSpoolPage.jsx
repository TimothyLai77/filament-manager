import { NumberInput, Button, Input, Stack, Card, Text, Field, Fieldset } from '@chakra-ui/react'
import SpoolCreationForm from '../components/SpoolCreationForm';
import TopNavBar from '../components/TopNavBar';
const CreateSpoolPage = () => {

  return (
    <>
      <TopNavBar />
      <SpoolCreationForm />
    </>
  )
}

export default CreateSpoolPage;