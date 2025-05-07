const express = require('express');
const router = express.Router();
const { SpoolNotFoundError } = require('../errors/errors.js');

const {
    createSpool,
    getSpools,
    getSpoolById,
    editSpool,
} = require('../modules/spoolLogic.js');


router.put('/spools/edit/:spoolId', async (req, res) => {
    try {
        console.log('PUT: /spools/edit/:spoolId');
        const spoolId = req.params.spoolId;

        const editedSpool = await editSpool(spoolId, req.body);
        res.status(200).send(editedSpool);
    } catch (e) {
        res.status(500).send(e)
    }
})


router.get('/spools', async (req, res) => {
    try {
        console.log("GET /spools")
        const spools = await getSpools();
        res.send(spools), 200;
    } catch (e) {
        console.log(e)
        res.status(500).send('Something went wrong.');
    }

})

router.post('/spools/create', async (req, res) => {
    try {
        console.log("POST: /spools/create")
        payload = req.body;
        const newSpool = await createSpool(payload);
        res.send(newSpool), 200
    } catch (e) {
        res.status(500)
        res.send('something went wrong')
    }
})


router.get('/spools/:id', async (req, res) => {
    try {
        console.log("GET /spools/:id")
        const id = req.params.id;
        const spool = await getSpoolById(id);
        res.send(spool), 200
    } catch (e) {
        console.log(e)
        res.status(500).send('Something went wrong.');
    }
})


module.exports = router;