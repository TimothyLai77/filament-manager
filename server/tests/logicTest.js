import { createSpool, getSpoolById, decreaseFilament, getSpools } from '../modules/spoolLogic.js'
import { createJob } from '../modules/jobLogic.js'
const runTests = async () => {
    const spoolId = await spoolCreationTest();
    //await getAllSpools();
    //await getLimitedSpools(2);

    const job1 = await createJobsTest(spoolId);

}

const createJobsTest = async (spoolId) => {
    const j1 = {
        name: 'job',
        filamentAmountUsed: 10.35,
    }

    await createJob(spoolId, j1);
}


const editSpoolFilament = async (id, amount) => {
    //console.log(await util.getSpoolById(id));
    const before = await getSpoolById(id);
    const after = await decreaseFilament(id, amount);

    console.log(`filament decrement test: ${before.filamentLeft - amount == after.filamentLeft}`);
    console.log(await util.getSpoolById(id))
}

const getAllSpools = async () => {
    console.log(await getSpools());
}

const getLimitedSpools = async (limit) => {
    console.log(await getSpools(limit));
}

const spoolCreationTest = async () => {

    const sData = {
        name: "spool name",
        brand: "bambu",
        material: "pla",
        colour: "black",
        finish: "matte",
        initialWeight: 1000.00,
        cost: 22.35,
    };


    const s1 = await createSpool(sData);
    const s1p = await getSpoolById(s1.id);
    console.log(`Creation test: spool created is same as returned: ${s1p.name == s1.name}`);
    return s1p.id;

}

export { runTests }