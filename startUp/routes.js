const express = require("express");
const fileRouter = require('../routes/fileUpload');
const solveTipRouter = require('../routes/SolveTipRoute');
const VideoStreamRouter = require('../routes/VideoStreamRoute');
const morgan = require('morgan');
const expressDebugger = require('debug')('express');
const constants = require('../utility/constants')

module.exports = function (app) {
    app.use(express.json());
    // 任何来自'/api/file'的访问将被fileRouter处理
    app.use('/api/file', fileRouter);
    app.use('/api/solveTip', solveTipRouter);
    app.use('/api/videoStream', VideoStreamRouter);
    // handle after all these middleware
    app.use(function (err, req, res, next) {
        res.status(500).send("Unknown Error.");
    })
    // static file located under root/public
    app.use(express.static('public'))
    // logger for get/post etc. only in debug mode, if "export NODE_ENV=production" in cmd(process.env.NODE_ENV),
    //  no morgan logger involved
    if (app.get('env') === 'development') {
        app.use(morgan('tiny'))
        expressDebugger('Use Morgan Logger');
    }

    // epress server
    app.listen(constants.expressPort, () => expressDebugger('express server running on port:' + constants.expressPort));
}