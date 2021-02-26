const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const usage = require('usage');

CHECK_CPU_USAGE_INTERVAL = 1000; //check every second for CPU usage
HIGH_CPU_USAGE_LIMITE = 70; //restart the node server on 70% usage of the CPU.

const fs = require("fs");
const { promisify } = require("util");
const {Worker,isMainThread, MessageChannel, workerData} = require('worker_threads');



const app = new express();
const upload = multer();


//Route for quering the MongoDB and getting the response 
app.use('/Policy',require('./controller/Policy'));

//Route for uploading the Post message with time and date
app.use('/Post',require('./controller/PostService'));

//Route to upload file to MongoDB server
app.use('/uploadfile', require('./controller/UploadCsv'));


//Welcome message
app.get("/:id", (req,resp) =>{
    resp.status(200).send('Welcome to the our API');
});


const worker = new Worker('./cron.js');

//function to listen to the CPU usage and restart the server on 70% of CPU usage.
autoRestart = setInterval(function(){
    usage.lookup(process.pid, function(err, result){
        if(!err)
        {
            if(result.cpu > HIGH_CPU_USAGE_LIMITE)
            {
                console.log('restarting the server due to high useage of CPU');
                 // restart because forever will respawn your process
                process.exit();
            }
        }
    })
}, CHECK_CPU_USAGE_INTERVAL);

const PORT = process.env.PORT || 3000
app.listen(PORT);
console.log(`Server started on: ${PORT}`);
