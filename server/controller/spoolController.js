const express = require('express');
const router = express.Router();

const {
    createSpool,
    getSpools,
    getSpoolById,
} = require('../modules/spoolLogic.js')

router.get('/spools', async (req, res) => {
    try {
        const spools = await getSpools();
        res.send(spools), 200;
    } catch (e) {
        console.log(e)
        res.status(500).send('Something went wrong.');
    }

})


router.get('/spools/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const spool = await getSpoolById(id);
        res.send(spool), 200
    } catch (e) {
        console.log(e)
        res.status(500).send('Something went wrong.');
    }
})


module.exports = router;