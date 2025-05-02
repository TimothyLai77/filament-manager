import { selectedSpoolAtom, loadableSelectedSpoolDetailsAtom } from '../atoms.js';
import { useAtom } from 'jotai';
import { Card } from '@chakra-ui/react';

const SpoolDetailCard = () => {
    const [selectedSpool] = useAtom(selectedSpoolAtom);
    const [spool] = useAtom(loadableSelectedSpoolDetailsAtom);
    const spoolText = () => {
        if(spool.state === 'loading'){
            return (
                <h1>Loading...</h1>
            );
        }
        if(spool.state === 'hasError'){
            return (
                <h1>Error</h1>
            )
        }
        const spoolData = spool.data
        return (
            <>
                <h1>{spoolData.id}</h1>
                <h1>{spoolData.name}</h1>
                <h1>{spoolData.colour}</h1>
            </>
        )
    }

    return(
        <>
            <Card.Root>
                <Card.Body>
                    {spoolText()}
                </Card.Body>
            </Card.Root>
        </>
    )
}
export default SpoolDetailCard;