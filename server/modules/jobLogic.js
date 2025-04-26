import { Sequelize } from "sequelize";
import uniqid from 'uniqid';
import { Job } from "../data/models/Job";
import { Spool } from "../data/models/Spool";
import { SpoolNotFoundError } from "../errors/errors";
import { decreaseFilament } from "./spoolLogic";


/**
 * Create a job given a spool to use (spoolId) other parameteres
 * @param {string} spoolId spoolId to use and to decrement from
 * @param {object} dataObj 
 * @returns 
 */
const createJob = async (spoolId, dataObj) => {
    try {
        // get spool, throw err if does not exist
        const spool = Spool.findByPk(spoolId);
        if (!spool) throw new SpoolNotFoundError;

        // calculate total cost for print
        const costPerGram = spool.cost / spool.initialWeight;
        const cost = dataObj.filamentAmountUsed * costPerGram;

        decreaseFilament(spoolId, dataObj.filamentAmountUsed);

        const newJob = await Job.create({
            id: uniqid('job-'),
            name: dataObj.name,
            filamentAmountUsed: dataObj.filamentAmountUsed,
            cost: cost,
            date: new Date(),
            spoolId: spoolId
        })

        return newJob.toJSON();
    } catch (e) {
        throw e;
    }
}

const deleteJob = async (id) => {

}

const editJob = async (id, newData) => {

}

export { createJob }