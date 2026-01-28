import { DataTypes } from 'sequelize';
import db from '../models/index.js'
// dereference the stagedjob model object
const { StagedJob } = db;
import { generateJobId } from './jobLogic.js';
import { Op } from "sequelize"
/**
 * Get all staged jobs from the database, and put them in a list
 * @returns the list of all staged jobs in the database
 */
const getStagedJobs = async () => {
    return await StagedJob.findAll();
}

/**
 * 
 * @param {number} threshold when to start getting staged jobs from in seconds. 24 * 60 * 60 returns staged all jobs over a day old
 * @returns {Array} the array of staged jobs.
 */
const getOldStagedJobs = async (threshold) => {
    const jobs = await StagedJob.findAll({
        where: {
            date: {
                // find all dates that more than 3 days old from the time of check
                [Op.lt]: new Date(new Date() - threshold * 1000)
            }
        }
    })
    return jobs;
}

/**
 * @param {id of staged job} id 
 * @returns 
 */
const getStagedJobById = async (id) => {
    try {
        return await StagedJob.findByPk(id);
    } catch (error) {
        console.log(error);
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
    getOldStagedJobs,
    getStagedJobs,
    addStagedJob,
    deleteStagedJob,
    getStagedJobById
}