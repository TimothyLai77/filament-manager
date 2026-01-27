import { getStagedJobById, deleteStagedJob, getOldStagedJobs } from './stagedJobLogic.js'
import { createJob } from './jobLogic.js';
import db from '../models/index.js';
const { StagedJob } = db;

const commitStagedJob = async (payload) => {
    // get the staged job object from seqeulize
    const stagedJob = await getStagedJobById(payload.jobId);
    if (!stagedJob) throw Error; // uhh idk i give up.    


    // this is very dumb. but need to repackage it.
    const newJobData = {
        id: payload.jobId,
        name: payload.name,
        filamentAmountUsed: payload.filamentAmountUsed,
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
/**
 * Find and delete all staged jobs past the threshold in seconds
 * @param {number} threshold when to start getting staged jobs from in seconds. 24 * 60 * 60 returns staged all jobs over a day old
 */
const cleanupOldStagedJobs = async (threshold) => {
    const oldJobs = await getOldStagedJobs(threshold)
    //console.log(oldJobs)
    oldJobs.map((job) => {
        console.log('auto-deleting staged job: ' + job.id)
        deleteStagedJob(job.id)
    })

}

export { commitStagedJob, cleanupOldStagedJobs }