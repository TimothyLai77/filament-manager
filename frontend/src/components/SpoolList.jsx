import { loadableSpoolArrayAtom } from "../atoms.js"
import { Table, Card,Stack, Button } from "@chakra-ui/react"
import { useAtom } from 'jotai'


const SpoolList = () => {
  const [spools] = useAtom(loadableSpoolArrayAtom)
  if (spools.state === 'hasError') console.error('something wrong with loading data')
  if (spools.state === 'loading') return <h1>loading</h1>
  const spoolList = spools.data;

  //console.log(spoolList[1]);
  return(
  <Card.Root>
    <Card.Body>
      <Card.Title>Current Filament</Card.Title>
      <Table.Root>
        <Table.Header>
          <Table.Row>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Brand</Table.ColumnHeader>
              <Table.ColumnHeader>Material</Table.ColumnHeader>
              <Table.ColumnHeader>Colour</Table.ColumnHeader>
              <Table.ColumnHeader>Finish</Table.ColumnHeader>
              <Table.ColumnHeader>Amount Left</Table.ColumnHeader>
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
              <Table.Cell>{spool.filamentLeft}</Table.Cell>
              <Table.Cell>
                <Button>Edit</Button>
              </Table.Cell>
              <Table.Cell>
                <Button>Create Job  </Button>
              </Table.Cell>
            </Table.Row>
        ))}
        </Table.Body>
      </Table.Root>
    </Card.Body>
  </Card.Root>
  )
}


export default SpoolList;
