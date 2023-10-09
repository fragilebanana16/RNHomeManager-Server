const mongoose = require('mongoose');
const dbDebugger = require('debug')('db');

module.exports = function () {
    // connect to db
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(async () => {
        dbDebugger('mongodb connected');
        // SolveTipApp.createSolveTip();
        // await getSolveTip(); 
        // await updateSolveTip('64b3f227c574e8ecf5d54bdc');
    }).catch(err =>
        dbDebugger(err.message));
}