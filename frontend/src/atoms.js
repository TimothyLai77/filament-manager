import { atom } from 'jotai'
import { loadable } from 'jotai/utils'

const asyncSpoolArrayAtom = atom(async () => {
    const response = await fetch('/api/spools');

    return response.json();
});

export const newSpoolAtom = atom(null)

export const newSpoolSendAtom = atom(null,
    async (get, set, payload) => {
        const response = await fetch('/api/void', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        console.log(data);
        set(newSpoolAtom, data);
    }
)

// export const asyncNewSpoolAtom = atom(null, async (get, set) => {
//     const data = get(newSpoolAtom);
//     console.log(data);
//     const response = await fetch('/api/void', {
//         method: 'POST',
//         body: JSON.stringify({ "test": "a" })
//     });
//     set(response);
//     //console.log(response);
// })

export const loadableSpoolArrayAtom = loadable(asyncSpoolArrayAtom);
