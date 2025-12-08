import { getStagedJobById, deleteStagedJob } from './stagedJobLogic.js'
import { createJob } from './jobLogic.js';

const commitStagedJob = async (payload) => {
    // get the staged job object from seqeulize
    const stagedJob = await getStagedJobById(payload.jobId);
    if (!stagedJob) throw Error; // uhh idk i give up.    


    // this is very dumb. but need to repackage it.
    const newJobData = {
        id: payload.jobId,
        name: payload.name,
        filamentAmountUsed: payload.filamentUsed,
        cost: payload.cost,
    }
    // create the new job under the selected spool
    const commitedJob = await createJob(payload.spoolId, newJobData);
    if (!commitedJob) throw Error;

    // new job exists, safe to delete the old one.
    // kind of roudn about way of doing things, but i don't want to call any seqeulize 
    // functoins here.
    await deleteStagedJob(payload.jobId);
    return commitedJob; // return the newly ocmmited job
}

export { commitStagedJob }