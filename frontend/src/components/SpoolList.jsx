import { loadableSpoolArrayAtom } from "../atoms.js"
import { Table, Card,Text, Button, HStack } from "@chakra-ui/react"
import { MdModeEdit,MdLibraryAdd } from "react-icons/md";
import { useAtom } from 'jotai'


const SpoolList = () => {
  const [spools] = useAtom(loadableSpoolArrayAtom)
  if (spools.state === 'hasError') return <h1>Something really broke...</h1>
  if (spools.state === 'loading') return <h1>loading</h1>
  const spoolList = spools.data;

  return(
  <Card.Root margin={5}>
    <Card.Body>
      <Card.Title>Current Filament</Card.Title>
      <Table.ScrollArea borderWidth="0px">
      <Table.Root interactive>
        <Table.Header>
          <Table.Row>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Brand</Table.ColumnHeader>
              <Table.ColumnHeader>Material</Table.ColumnHeader>
              <Table.ColumnHeader>Colour</Table.ColumnHeader>
              <Table.ColumnHeader>Finish</Table.ColumnHeader>
              <Table.ColumnHeader>Amount Left (g)</Table.ColumnHeader>
              <Table.ColumnHeader align="end">Actions</Table.ColumnHeader> 
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
                <HStack>
                  <Button size="xs">
                    <MdModeEdit/>
                    Edit
                  </Button>
                  <Button size="xs">
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
  )
}


export default SpoolList;
