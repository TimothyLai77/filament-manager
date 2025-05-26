import { atom } from "jotai";
import { atomWithRefresh, loadable } from "jotai/utils";
// idk i don't really like doing this?
import { finalSpoolArrayAtom, selectedSpoolAtom, finalSelectedSpoolAtom } from "./atoms";

// ATOMS related to creating print jobs
export const newJobBaseAtom = atom(null);

// todo: i have no idea why this is atomWithRefresh? did i do this on purpose???
export const asyncNewJobAtom = atomWithRefresh(
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
            set(finalSpoolArrayAtom) // refresh spool list
            set(finalJobArrayAtom)
            return;
        } catch (e) {
            throw e;
            //set(newJobBaseAtom, e);
        }
    }
)

//atoms related to getting a list of jobs
//const jobArrayAtom = atom([]);
//  const response = await fetch(`/api/jobs/history/${get(selectedSpoolAtom)}`);
const asyncJobArrayAtom = atomWithRefresh(async (get) => {
    const requestedId = get(selectedSpoolAtom);
    if (!requestedId) return null;
    const response = await fetch(`/api/jobs/history/${get(selectedSpoolAtom)}`);
    return await response.json();
})

export const finalJobArrayAtom = atom(
    (get) => get(loadableJobArrayAtom),
    (get, set) => set(asyncJobArrayAtom)
);


export const asyncEditJobAtom = atom(
    null,
    async (get, set, payload) => {
        try {
            const response = await fetch(`/api/jobs/edit/${payload.jobId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            set(finalSelectedSpoolAtom) // refresh the selected spool
            set(finalJobArrayAtom) // refresh the job array
            return data;
        } catch (e) {
            return e
        }
    }
)
export const loadableJobArrayAtom = loadable(asyncJobArrayAtom);