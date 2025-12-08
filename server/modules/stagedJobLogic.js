import { DataTypes } from 'sequelize';
import db from '../models/index.js'
// dereference the stagedjob model object
const { StagedJob } = db;
import { generateJobId } from './jobLogic.js';

/**
 * Get all staged jobs from the database, and put them in a list
 * @returns the list of all staged jobs in the database
 */
const getStagedJobs = async () => {
    return await StagedJob.findAll();
}

/**
 * @param {id of staged job} id 
 * @returns 
 */
const getStagedJobById = async (id) => {
    try {
        return await StagedJob.findByPk(id);
    } catch (error) {
        console.log(erro);
    }
}

/**
 * add staged job to the database
 * @param {json payload} payload 
 * @returns returns the new stagejob object back on success.
 */
const addStagedJob = async (payload) => {
    try {
        //console.log(payload)
        const newJob = await StagedJob.create({
            id: generateJobId(),
            name: payload.name,
            filamentUsed: payload.filamentUsed,
            date: new Date(payload.date)

        });
        return newJob;
    } catch (error) {
        console.log(error)
    }


}

/**
 * destroy staged job given the job's id
 * @param {id of staged job to delete} id 
 * @returns nothing, but returns an error on error. kinda bad design, oh well.
 */
const deleteStagedJob = async (id) => {
    try {
        const stagedJob = await StagedJob.findByPk(id)
        await stagedJob.destroy();
    } catch (error) {
        return error;
    }
}


export {
    getStagedJobs,
    addStagedJob,
    deleteStagedJob,
    getStagedJobById
}