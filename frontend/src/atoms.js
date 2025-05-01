import { atom } from 'jotai'
import { loadable } from 'jotai/utils'

const asyncSpoolArrayAtom = atom(async () => {
    const response = await fetch('/api/spools');

    return response.json();
});

export const asyncNewSpoolAtom = atom(
    null,
    async (get, set, payload) => {
        const response = await fetch('/api/spools/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        console.log(data);
        set(asyncNewSpoolAtom, data);
    }
)

export const loadableSpoolArrayAtom = loadable(asyncSpoolArrayAtom);
