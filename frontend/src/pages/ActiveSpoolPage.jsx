import SpoolList from '../components/SpoolList'
import { Card ,Flex,HStack,Button,Separator,Text} from '@chakra-ui/react';
const ActiveSpoolPage = () => {
  return (
    <>
      <Card.Root margin={5}>
       <Card.Body>
      <Card.Title >
       <Flex justify="space-between" align="center">
        <Text  fontWeight="bold">Current filament</Text>
  
        <HStack justifyContent="right"> 
          <Button size="xs" onClick={() => {navigate("/create-spool")}}>
            Add Filament
          </Button>
        </HStack>
       </Flex>

      </Card.Title>
      </Card.Body>
      </Card.Root>
      <SpoolList />
    </>
  )
}

export default ActiveSpoolPage;