const express = require('express');
const router = express.Router();
const { getStagedJobs, addStagedJob, deleteStagedJob } = require('../modules/stagedJobLogic')
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
        console.log(`DELETE: /stagedjobs/${req.params.jobId}`);
        await deleteStagedJob(req.params.jobId);
        res.status(200).end();
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;