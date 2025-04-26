import { createSpool, getSpoolById, decreaseFilament, getSpools } from '../modules/spoolLogic.js'
import { createJob, getJobs, getJobsBySpool } from '../modules/jobLogic.js'
const runTests = async () => {
    const spoolId = await spoolCreationTest();
    //await getAllSpools();
    //await getLimitedSpools(2);

    await createJobsTest(spoolId);
    await getJobsTest(spoolId);


}


const getJobsTest = async (spoolId) => {
    console.log(`Getting ALL JOBS:`)
    const allJobs = await getJobs();

    for (let i = 0; i < allJobs.length; i++) {
        console.log(allJobs[i].name);
    }

    console.log(`============= getting jobs by spool =======`);
    const jobs2 = await getJobsBySpool(spoolId);
    for (let i = 0; i < jobs2.length; i++) {
        console.log(`${spoolId} --> ${jobs2[i].name}`);
    }

}

const createJobsTest = async (spoolId) => {
    const j1 = {
        name: 'job',
        filamentAmountUsed: 10.35,
    };
    let jobArr = []
    for (let i = 0; i < 10; i++) {
        jobArr.push({
            name: `'job-${i}`,
            filamentAmountUsed: Math.random() * 100
        })
    }

    for await (const job of jobArr) {
        await createJob(spoolId, job);
    }


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