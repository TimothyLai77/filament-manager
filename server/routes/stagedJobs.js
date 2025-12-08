const express = require('express');
const router = express.Router();
const { getStagedJobs, addStagedJob, deleteStagedJob } = require('../modules/stagedJobLogic');
const { commitStagedJob } = require('../modules/jobManager');
router.get('/', async (req, res) => {
    try {
        console.log('GET: /stagedJobs');
        const jobList = await getStagedJobs();
        res.status(200).send(jobList);
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post('/', async (req, res) => {
    try {
        console.log('POST: /stagedjobs');
        const newJob = await addStagedJob(req.body)
        res.status(200).send(newJob)
    } catch (error) {
        res.status(500).send(error)
    }
})

/**
 * route to delete the staged job given the id. 
 */
router.delete('/:id', async (req, res) => {
    try {
        console.log(`DELETE: /stagedjobs/${req.params.id}`);
        await deleteStagedJob(req.params.id);
        res.status(200).end();
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post('/commit/:id', async (req, res) => {
    try {
        console.log(`POST: /commit/${req.params.id}`);
        const commitedJob = await commitStagedJob(req.body);
        res.status(200).send(commitedJob);
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;