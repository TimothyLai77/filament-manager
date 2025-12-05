import { DataTypes } from 'sequelize';
import db from '../models/index.js'
// dereference the stagedjob model object
const { StagedJob } = db;

import { generateJobId } from './jobLogic.js';
const getStagedJobs = async () => {
    return await StagedJob.findAll();
}

const addStagedJob = async (payload) => {
    try {
        console.log(payload)
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


export {
    getStagedJobs,
    addStagedJob
}