import { atom } from 'jotai'
import { loadable } from 'jotai/utils'
// todo: im pretty sure this is 'wrong'
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
        try {
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
        } catch (e) {
            set(newSpoolBaseAtom, e);
        }

    }
)

// atoms for selecting which spool to edit/create jobs/view details for
export const selectedSpoolAtom = atom('');
const asyncSelectedSpoolDetailsAtom = atom(async (get) => {
    try {
        const response = await fetch(`/api/spools/${get(selectedSpoolAtom)}`, {
            method: 'GET',
        });
        const data = await response.json();
        //set(asyncSelectedSpoolDetailsAtom, data);
        return data;
    } catch (e) {
        return 'error';
    }

})

// ATOMS related to creating print jobs
export const newJobBaseAtom = atom(null);
export const asyncNewJobAtom = atom(
    get => get(newJobBaseAtom),
    async (get, set, payload) => {
        try {
            const response = await fetch('/api/jobs/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                //console.log('bad status')
                if (response.status == 501) {
                    set(newJobBaseAtom, new Error('not enough filament'));
                } else {
                    set(newJobBaseAtom, new Error('server error'));
                }
            }
            const data = await response.json();
            set(newJobBaseAtom, data);
        } catch (e) {
            throw e;
            //set(newJobBaseAtom, e);
        }
    }

)
//atoms related to getting a list of jobs
//const jobArrayAtom = atom([]);
//  const response = await fetch(`/api/jobs/history/${get(selectedSpoolAtom)}`);
const asyncJobArrayAtom = atom(async (get) => {
    const requestedId = get(selectedSpoolAtom);
    if (!requestedId) return null;
    const response = await fetch(`/api/jobs/history/${get(selectedSpoolAtom)}`);
    return await response.json();
}

)


export const loadableSpoolArrayAtom = loadable(asyncSpoolArrayAtom);
export const loadableSelectedSpoolDetailsAtom = loadable(asyncSelectedSpoolDetailsAtom);
export const loadableJobArrayAtom = loadable(asyncJobArrayAtom);