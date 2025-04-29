import { atom } from 'jotai'
import { loadable } from 'jotai/utils'

const asyncSpoolArrayAtom = atom(async () => {
    const response = await fetch('/api/spools');

    return response.json();
});

export const loadableSpoolArrayAtom = loadable(asyncSpoolArrayAtom);