import { loadableSpoolArrayAtom } from "../atoms.js"
import {  Text, Flex, Table, Card, Button, HStack, Center, Separator } from "@chakra-ui/react"
import { MdModeEdit,MdLibraryAdd, MdInfoOutline} from "react-icons/md";
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { selectedSpoolAtom } from "../atoms.js";

const SpoolList = () => {
  const navigate = useNavigate();
  const [spools] = useAtom(loadableSpoolArrayAtom)
  const [,setSelectedSpool] = useAtom(selectedSpoolAtom);
  if (spools.state === 'hasError') return <h1>Something really broke...</h1>
  if (spools.state === 'loading') return <h1>loading</h1>
  const spoolList = spools.data;

  return(
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
        <Separator size="lg"/>
      </Card.Title>
     
      <Table.ScrollArea margin={5} borderWidth="0px">
      <Table.Root interactive>
        <Table.Header>
          <Table.Row>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Brand</Table.ColumnHeader>
              <Table.ColumnHeader>Material</Table.ColumnHeader>
              <Table.ColumnHeader>Colour</Table.ColumnHeader>
              <Table.ColumnHeader>Finish</Table.ColumnHeader>
              <Table.ColumnHeader>Amount Left (g)</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Actions</Table.ColumnHeader> 
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {spoolList.map((spool) => (
            <Table.Row key={spool.id}>
              <Table.Cell>{spool.name}</Table.Cell>
              <Table.Cell>{spool.brand}</Table.Cell>
              <Table.Cell>{spool.material}</Table.Cell>
              <Table.Cell>{spool.colour}</Table.Cell>
              <Table.Cell>{spool.finish}</Table.Cell>
              <Table.Cell>{spool.filamentLeft.toFixed(2)}</Table.Cell>
              <Table.Cell align="end">
                <HStack justifyContent="right">
                  <Button size="xs">
                    <MdInfoOutline />
                    Details
                  </Button>
                  <Button size="xs">
                    <MdModeEdit/>
                    Edit
                  </Button>
                  <Button size="xs"
                    onClick={() => {
                      setSelectedSpool(spool.id);
                      navigate("create-job");
                    }}
                  >
                    <MdLibraryAdd />
                    Create Job 
                  </Button>

                </HStack>          
              </Table.Cell>
            </Table.Row>
        ))}
        </Table.Body>
      </Table.Root>
      </Table.ScrollArea>
    </Card.Body>
  </Card.Root>
 </>
  )
}


export default SpoolList;
