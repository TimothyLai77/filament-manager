import { Sequelize } from "sequelize";
import uniqid from 'uniqid';
import { Job } from "../data/models/Job.js";
import { Spool } from "../data/models/Spool.js";
import { JobNotFoundError, SpoolNotFoundError } from "../errors/errors.js";
import { changeFilamentAmount, decreaseFilament, incrementJobCount } from "./spoolLogic.js";


/**
 * Returns an array of jobs that used a spool
 * @param {string} spoolId 
 * @returns array of jobs that belong to that spool
 */
const getJobsBySpool = async (spoolId) => {
    try {
        const jobs = await Job.findAll({
            where: {
                spoolId: spoolId
            }
        });
        const formattedJobs = jobs.map((job) => job.toJSON());
        return formattedJobs;
    } catch (e) {
        throw e;
    }
}

/**
 * get all jobs
 * @returns all jobs
 */
const getJobs = async () => {
    try {
        const jobs = await Job.findAll();
        const formattedJobs = jobs.map((job) => job.toJSON());
        return formattedJobs;
    } catch (e) {
        throw e;
    }
}
/**
 * Create a job given a spool to use (spoolId) other parameteres
 * @param {string} spoolId spoolId to use and to decrement from
 * @param {object} dataObj 
 * @returns 
 */
const createJob = async (spoolId, dataObj) => {
    try {
        // get spool, throw err if does not exist
        const spool = await Spool.findByPk(spoolId);
        if (!spool) throw new SpoolNotFoundError;

        // calculate total cost for print if no information was passed
        let cost = NaN;
        if (dataObj.cost == null) {
            const costPerGram = spool.cost / spool.initialWeight;
            cost = dataObj.filamentAmountUsed * costPerGram;
        } else {
            cost = dataObj.cost;
        }


        await decreaseFilament(spoolId, dataObj.filamentAmountUsed);
        await incrementJobCount(spoolId);
        const newJob = await Job.create({
            id: uniqid('job-'),
            name: dataObj.name,
            filamentAmountUsed: dataObj.filamentAmountUsed,
            cost: cost.toFixed(4),
            date: new Date(),
            spoolId: spoolId
        })

        return newJob.toJSON();
    } catch (e) {
        //console.log(`CAUGHT: ${e}`)
        throw e;
    }
}



const deleteJob = async (id) => {
    try {
        const job = await Job.findByPk(id);
        if (!job) throw new JobNotFoundError;
        await job.destroy();
        return true;
    } catch (e) {
        throw e;
    }
}
//todo: another day lol
const editJob = async (jobId, newData) => {
    try {
        const jobToEdit = await Job.findByPk(jobId);
        if (!jobToEdit) throw new JobNotFoundError;

        // apply changes to the spool's filament amount first:
        let filamentDelta = 0;
        if (newData.filamentAmountUsed == 0) {
            filamentDelta = jobToEdit.filamentAmountUsed;
        } else {
            filamentDelta = jobToEdit.filamentAmountUsed - newData.filamentAmountUsed;
        }
        await changeFilamentAmount(jobToEdit.spoolId, filamentDelta)

        // make changes to the job
        jobToEdit.name = newData.name;
        jobToEdit.filamentAmountUsed = newData.filamentAmountUsed;
        jobToEdit.cost = newData.cost
        await jobToEdit.save();
        return jobToEdit.toJSON();
    } catch (e) {
        throw e;
    }




}

export { editJob, createJob, deleteJob, getJobsBySpool, getJobs }