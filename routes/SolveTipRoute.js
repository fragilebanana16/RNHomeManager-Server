const express = require('express');
const router = express.Router();
const SolveTipApp = require('../controllers/SolveTipApp')


router.get('/', async (req, res)=>{
    const solveRes = await SolveTipApp.getSolveTip();
    res.send(solveRes);
});

module.exports = router;