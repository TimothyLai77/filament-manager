import { Table, Card,Stack, Button } from "@chakra-ui/react"

const SpoolList = () => {

const items = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
  { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
  { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
  { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
  { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
]

  return (
    <div>
        <Card.Root margin={5}>
            <Card.Header>
                <Card.Title>Filament List</Card.Title>
            </Card.Header>
            <Card.Body>
                <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Product</Table.ColumnHeader>
          <Table.ColumnHeader>Category</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.category}</Table.Cell>
            <Table.Cell>
                <Button>
                    press me
                </Button>
            </Table.Cell>
                <Table.Cell>
                <Button>
                    press me 2
                </Button>
            </Table.Cell>
            <Table.Cell textAlign="end">{item.price}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
            </Card.Body>
            <Card.Footer />
        </Card.Root>
    </div>
  )
}


export default SpoolList;
