import SpoolList from '../components/SpoolList'
import { Tabs,Box,Card ,Flex,HStack,Button,Separator,Text} from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
const ActiveSpoolPage = () => {

  const titleCard = (isActiveFilament) => {
    const navigate = useNavigate();
    return (
      <Card.Root minHeight="15%">
       <Card.Body>
      <Card.Title >
       <Flex justify="space-between" align="center">
        {
          isActiveFilament ? 
             <Text fontWeight="bold">Active Spools</Text>
          :
            <Text fontWeight="bold">Finished Spools</Text>
        }
        {
          isActiveFilament ? 
            <HStack justifyContent="right"> 
                <Button size="xs" onClick={() => {navigate("/create-spool")}}>
                  Add Filament
                </Button>
            </HStack>
          : <></>
        }
       </Flex>
      </Card.Title>
      </Card.Body>
      </Card.Root>
    )
  }


  return (
    <>
      <Box margin={5}>
          <Tabs.Root minWidth="100%" defaultValue="active" variant="enclosed">
          <Flex justify="center" width="100%">
          <Tabs.List display="flex" justifyContent="center">
            <Tabs.Trigger value="active">
              Active Spools
            </Tabs.Trigger>
            <Tabs.Trigger value="finished">
              Finished Spools
            </Tabs.Trigger>
          </Tabs.List>
          </Flex>
          <Tabs.Content value="active">
            {titleCard(true)}
          </Tabs.Content>
          <Tabs.Content value="finished">
            {titleCard(false)}
          </Tabs.Content>
        </Tabs.Root>
      </Box>

      {/* <Card.Root margin={5}>
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
      </Card.Root> */}
      <SpoolList />
    </>
  )
}

export default ActiveSpoolPage;