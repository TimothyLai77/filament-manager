const express = require('express');
const router = express.Router();
const { getStagedJobs, addStagedJob } = require('../modules/stagedJobLogic')
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

module.exports = router;