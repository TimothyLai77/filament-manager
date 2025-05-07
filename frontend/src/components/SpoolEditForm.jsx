
import { Button, Input, Stack, Card, Text, Field, Fieldset} from '@chakra-ui/react'
import { loadableSelectedSpoolDetailsAtom, finalSpoolArrayAtom } from '../atoms';
import { useAtom } from 'jotai';
import { useState } from 'react';
const SpoolEditForm = ({spoolData}) => {

    const [name, setName] = useState(spoolData.name);
    const [brand, setBrand] = useState(spoolData.brand);
    const [material, setMaterial] = useState(spoolData.material);
    const [colour, setColour] = useState(spoolData.colour);
    const [finish, setFinish] = useState(spoolData.finish);
    const [initialWeight, setInitialWeight] = useState(spoolData.initialWeight);
    const [cost, setCost] = useState(spoolData.cost);
    const [filamentUsed, setFilamentUsed] = useState(spoolData.filamentUsed)


    return(
            <Fieldset.Root>
                <Field.Root>
                    <Field.Label>Name</Field.Label>
                    <Input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />

                    <Field.Label>Brand</Field.Label>
                    <Input
                         onChange={(e) => setBrand(e.target.value)}
                        value={brand}
                    />

                    <Field.Label>Material</Field.Label>
                    <Input
                        onChange={(e) => setMaterial(e.target.value)}
                        value={material}
                    />
       
                    <Field.Label>Colour</Field.Label>
                    <Input
                        onChange={(e) => setColour(e.target.value)}
                        value={colour}
                    />

                    <Field.Label>Finish (optional)</Field.Label>
                    <Input
                        onChange={(e) => setFinish(e.target.value)}
                        value={finish}
                    />

                  <Field.Label>Initial Weight (g)</Field.Label>
                    <Input
                        onChange={(e) => setInitialWeight(e.target.value)}
                        value={initialWeight}
                    />

                    <Field.Label>Filament Used (g)</Field.Label>
                    <Input
                        onChange={(e) => setFilamentUsed(e.target.value)}
                        value={filamentUsed}
                    />

                   <Field.Label>Cost ($)</Field.Label>
                    <Input
                        onChange={(e) => setCost(e.target.value)}
                        value={cost}
                    />
                </Field.Root>
            </Fieldset.Root>

       
    );
}

export default SpoolEditForm;