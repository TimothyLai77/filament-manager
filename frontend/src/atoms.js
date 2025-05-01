import { atom } from 'jotai'
import { loadable } from 'jotai/utils'

const asyncSpoolArrayAtom = atom(async () => {
    const response = await fetch('/api/spools');

    return response.json();
});

// not really sure how this works? but looks like the tutorials use
// base atoms to store stuff, and we have the async atoms that can modify it?
export const newSpoolBaseAtom = atom(null)
export const asyncNewSpoolAtom = atom(
    (get) => get(newSpoolBaseAtom),
    async (get, set, payload) => {
        const response = await fetch('/api/spools/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        //console.log(data);
        set(newSpoolBaseAtom, data);
    }
)

export const loadableSpoolArrayAtom = loadable(asyncSpoolArrayAtom);
