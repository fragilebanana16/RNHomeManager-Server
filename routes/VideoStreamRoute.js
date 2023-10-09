const express = require('express');
const router = express.Router();
const constants = require('../utility/constants')
const fs = require('fs');
const {promisify} = require('util');
const {stat} = require('fs');
const fileInfo = promisify(stat);

router.get('/videosDataList', (req, res) => {
    res.json(constants.videosData)
});

router.get('/video/:id', async (req, res) => {
    if (!req.params.id) {
        return;
    }

    console.log(req.params.id);
    const range = req.headers.range;
    const videoPath = './uploaded/' + req.params.id;
    // if (condition) {
    //  file exists
    // }
    const videoSize = fs.statSync(videoPath).size;
    const { size } = await fileInfo(videoPath);
    if (range) {
        const chunkSize = 1 * 1e+6;
        const start = Number(range.replace(/\D/g, ''));
        const end = Math.min(start + chunkSize, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4"
        }
        res.writeHead(206, headers);

        const stream = fs.createReadStream(videoPath, { start, end })
        stream.pipe(res);
    } else {
        res.writeHead(200, {
            'Content-Length': size,
            'Content-Type': 'video/mp4'
        });
        fs.createReadStream(videoPath).pipe(res);
    }

});

module.exports = router;