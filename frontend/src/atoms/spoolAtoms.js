import { atom } from "jotai";
import { atomWithRefresh, loadable } from "jotai/utils";

// atoms related to getting the main list of spools
const asyncSpoolArrayAtom = atomWithRefresh(
    async () => {
        const response = await fetch('/api/active-spools');
        const data = await response.json();
        return data;
    }
);

export const finalSpoolArrayAtom = atom(
    (get) => get(loadableSpoolArrayAtom),
    (get, set) => set(asyncSpoolArrayAtom)
)
// atoms related to getting the main list of spools
const asyncFinishedSpoolArrayAtom = atomWithRefresh(
    async () => {
        const response = await fetch('/api/finished-spools');
        const data = await response.json();
        return data;
    }
);

export const finalFinishedSpoolArrayAtom = atom(
    (get) => get(loadableFinishedSpoolArrayAtom),
    (get, set) => set(asyncFinishedSpoolArrayAtom)
)


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
            return;
        } catch (e) {
            set(newSpoolBaseAtom, e);
        }

    }
)

// atoms for selecting which spool to edit/create jobs/view details for
export const selectedSpoolAtom = atom('');
const asyncSelectedSpoolDetailsAtom = atomWithRefresh(async (get) => {
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

// https://github.com/pmndrs/jotai/discussions/2251#discussioncomment-9235793
// and also https://github.com/pmndrs/jotai/discussions/2251#discussioncomment-10163733
// seems to be a workaround for not being able to have refreshable loadable atoms
// loadable atoms can't have a write function which is what the refresh call is
export const finalSelectedSpoolAtom = atom(
    (get) => get(loadableSelectedSpoolDetailsAtom),
    (get, set) => set(asyncSelectedSpoolDetailsAtom)
);

export const asyncPutSpoolEditAtom = atom(
    null,
    async (get, set, payload) => {
        try {
            const response = await fetch(`/api/spools/edit/${payload.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            set(finalSelectedSpoolAtom); // refresh the spool
            set(finalSpoolArrayAtom)
            return data;
        } catch (e) {
            return e
        }
    }
)

export const markSpoolAsFinishedAtom = atom(
    null,
    async (get, set, id) => {
        try {
            const response = await fetch(`/api/spools/mark-finished/${id}`, {
                method: 'PUT'
            });
            const data = await response.json();
            set(finalSelectedSpoolAtom) // refresh in case user goes back and checks
            set(finalSpoolArrayAtom) // refresh main list
            set(finalFinishedSpoolArrayAtom)
            return data;
        } catch (e) {
            return e
        }
    }
)

// Atom for getting the attributes for elastic search 
export const asyncSpoolAttributeAtom = atom(
    async () => {
        const response = await fetch('/api/spools/attributes');
        const data = await response.json();
        return data;
    }
);




export const loadableSpoolArrayAtom = loadable(asyncSpoolArrayAtom);
export const loadableFinishedSpoolArrayAtom = loadable(asyncFinishedSpoolArrayAtom)
export const loadableSelectedSpoolDetailsAtom = loadable(asyncSelectedSpoolDetailsAtom);