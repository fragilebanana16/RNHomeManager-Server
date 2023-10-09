const { SolveTip } = require('../models/SolveTipModel');
const dbDebugger = require('debug')('db');

// create
async function createSolveTip() {
    const solveTip = new SolveTip({
        description: ' 水表 有 余额停 水3',
        solution: ['检查水表是否有电，更换水表电池    2          '],
        category: 'utility',
        solvedRecords: [{ conclusion: '更换电池后正常2', solveDate: Date.now(), voteForThisRecord: 1 }],
        imageNameLists: ['nft02.jpeg', 'nft03.jpeg'],
    });

    try {
        const saveSolveTipResult = await solveTip.save();
        dbDebugger(saveSolveTipResult);
    } catch (error) {
        // dbDebugger(error.message);
        for (field in error.errors) {
            dbDebugger(error.errors[field].message);
        }
    }
}

// read 
async function getSolveTip() {
    try {
      const tips = await SolveTip.find({ category: 'utility' });
      return tips;
    } catch (error) {
      return error.message;
    }
    // dbDebugger(tips);
}

// update 
async function updateSolveTip(id) {
    const tip = await SolveTip.findById(id);
    if (!tip) { return; }
    tip.updatedDate = Date.now();
    const res = await tip.save();
    dbDebugger(res);
}

// delete 
async function deleteSolveTip(id) {
    const res = SolveTip.deleteOne({ _id: id });
    dbDebugger(res);
}

module.exports = {createSolveTip, getSolveTip, updateSolveTip, deleteSolveTip};