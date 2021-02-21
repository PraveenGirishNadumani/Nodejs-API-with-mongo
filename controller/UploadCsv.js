const express = require('express');
const {Worker,isMainThread, MessageChannel, workerData} = require('worker_threads');
const multer = require('multer');

const app = new express.Router();
const upload = multer();

const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

app.post('/', upload.single('csv-file'), async(req, resp, next) =>{

    if(isMainThread){

        let fileName = Math.floor(Math.random() * Math.floor(1000000000))+"-"+req.file.originalName;
        console.log(fileName);
        await pipeline(
            req.file.stream,
            fs.createWriteStream(`${__dirname}/../files/${fileName}`)
        );
        const worker = new Worker('./controller/Workers/uploadWorker.js', {workerData: fileName});
        console.log('creating worker for file upload');

        worker.once('message', (message) => {
            resp.status(200).send('file uploading done!');
        });
    }

});

module.exports = app;