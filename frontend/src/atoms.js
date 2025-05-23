import { atom, useAtom } from 'jotai'
import { atomWithRefresh, loadable } from 'jotai/utils'


export const spoolTabSelectorAtom = atom();

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

//ATOMS for editing spools
// atom for whether or not to show the edit button on the spool detail card
// i have no idea if this should actually be an atom or not...
export const showSpoolManagementButtonsAtom = atom(false);
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


export const loadableSpoolArrayAtom = loadable(asyncSpoolArrayAtom);
export const loadableFinishedSpoolArrayAtom = loadable(asyncFinishedSpoolArrayAtom)
export const loadableSelectedSpoolDetailsAtom = loadable(asyncSelectedSpoolDetailsAtom);
export const loadableJobArrayAtom = loadable(asyncJobArrayAtom);