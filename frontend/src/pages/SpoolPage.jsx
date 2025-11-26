import SpoolList, { VARIANTS } from '../components/SpoolList'
import { Tabs, Box, Card, Flex, HStack, Button, Separator, Text, useTabs } from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import TopNavBar from '../components/TopNavBar';
import { fetchActiveSpoolList, fetchFinishedSpoolsList } from '@/features/spools/spoolSlice';
const SpoolPage = () => {
  const dispatch = useDispatch();

  // Chakra UI hook 
  const tabs = useTabs({
    defaultValue: VARIANTS.active
  })



  useEffect(() => {
    dispatch(fetchActiveSpoolList());
    dispatch(fetchFinishedSpoolsList());
  }, [])


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
              <Tabs.Trigger value={VARIANTS.active}>
                Active
              </Tabs.Trigger>
              <Tabs.Trigger value={VARIANTS.finished}>
                Finished Spools
              </Tabs.Trigger>
            </Tabs.List>
          </Flex>
          <Tabs.Content value={VARIANTS.active}>
            {titleCard(true)}
          </Tabs.Content>
          <Tabs.Content value={VARIANTS.finished}>
            {titleCard(false)}
          </Tabs.Content>
        </Tabs.RootProvider>
      </Box>
      <SpoolList listType={tabs.value} />
    </>
  )
}

export default SpoolPage;