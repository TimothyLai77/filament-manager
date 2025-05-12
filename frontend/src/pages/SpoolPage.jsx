import SpoolList from '../components/SpoolList'
import { Tabs, Box, Card, Flex, HStack, Button, Separator, Text, useTabs } from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { spoolTabSelectorAtom } from '../atoms';
import { useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
const SpoolPage = () => {
  const [, setTab] = useAtom(spoolTabSelectorAtom);

  const tabs = useTabs({
    defaultValue: "active"
  })

  useEffect(() => {
    setTab(tabs.value)
  }, [tabs])

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
                    <Button size="xs" onClick={() => { navigate("/create-spool") }}>
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
      <TopNavBar />
      <Box margin={5}>
        <Tabs.RootProvider value={tabs} lazyMount fitted variant="enclosed">
          <Flex justify="center" width="100%">
            <Tabs.List display="flex" justifyContent="center">
              <Tabs.Trigger value="active">
                Active
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
        </Tabs.RootProvider>
      </Box>
      <SpoolList />
    </>
  )
}

export default SpoolPage;