import { Box, Flex, Table, Card, Button, HStack, ProgressCircle, Separator } from "@chakra-ui/react"
import { MdModeEdit, MdLibraryAdd, MdInfoOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { fetchActiveSpoolList } from '../features/spools/spoolSlice'
export const VARIANTS = {
    active: 'active',
    finished: 'finished'
};
const SpoolList = ({ listType }) => {
    const dispatch = useDispatch();
    // note to self: these are the 
    const { spoolList, finishedSpoolList, loading, error } = useSelector((state) => state.spools)
    const navigate = useNavigate();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    var sortedSpoolList = [];
    if (listType === VARIANTS.finished) {
        // if the list type is set to render finished spools put that inthe array.
        sortedSpoolList = [...finishedSpoolList];
    } else {
        // default will be the active spools
        sortedSpoolList = [...spoolList];
    }
    //console.log(spoolList);
    sortedSpoolList.sort((s1, s2) => Date.parse(s2.createdAt) - Date.parse(s1.createdAt))

    return (
        <>
            <Box margin={5} borderWidth="1px">
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
                            {sortedSpoolList.map((spool) => (
                                <Table.Row key={spool.id}>
                                    <Table.Cell>{spool.name}</Table.Cell>
                                    <Table.Cell>{spool.brand}</Table.Cell>
                                    <Table.Cell>{spool.material}</Table.Cell>
                                    <Table.Cell>{spool.colour}</Table.Cell>
                                    <Table.Cell>{spool.finish}</Table.Cell>
                                    <Table.Cell>
                                        <HStack gap={5}>

                                            <ProgressCircle.Root value={
                                                spool.filamentLeft / spool.initialWeight * 100
                                            } size='xs'>
                                                <ProgressCircle.Circle>
                                                    <ProgressCircle.Track />
                                                    <ProgressCircle.Range />
                                                </ProgressCircle.Circle>
                                            </ProgressCircle.Root>
                                            {spool.filamentLeft.toFixed(2)}
                                        </HStack>


                                    </Table.Cell>

                                    <Table.Cell align="end">
                                        <HStack justifyContent="right">
                                            <Button
                                                size="xs"
                                                onClick={() => {
                                                    navigate(`/details/${spool.id}`);
                                                }}
                                            >
                                                <MdInfoOutline />
                                                Details
                                            </Button>
                                            {
                                                // check the current spool status and decide to render the create job button or not
                                                !spool.isEmpty ?
                                                    <Button size="xs"
                                                        onClick={() => {
                                                            //setSelectedSpool(spool.id);
                                                            navigate(`/create-job/${spool.id}`);

                                                        }}
                                                    >
                                                        <MdLibraryAdd />
                                                        Create Job
                                                    </Button>
                                                    :
                                                    <></>
                                            }


                                        </HStack>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>
            </Box>
        </>
    )
}


export default SpoolList;
