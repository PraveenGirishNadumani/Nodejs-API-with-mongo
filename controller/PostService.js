const bodyParser = require('body-parser');
const { response } = require('express');
const cron = require('node-cron');
const express = require('express');
const env = require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('../models/postModel');


const app = express.Router();
app.use(bodyParser.json());

//Connecting to MongoBD server.
mongoose.connect(process.env.MongoUrl, {useNewUrlParser: true, useUnifiedTopology: true  });


//Post message to the MongoBD
app.post('/', (req,resp) => {

    let post = new Post();
    post.message = req.body.message;
    post.date = req.body.date;
    post.time = req.body.time;

    // Getting the epoc values from the humar readable time
    var postTimeValue = req.body.date+ " : "+ req.body.time+ " : " +req.body.GMT;
    var date = new Date(postTimeValue);
    console.log(date.getTime()+" time value: "+ postTimeValue);
    var endTime = Date.now();
    
    //Convering the time difference into miliseconds, so that we could add this to the event queue for scheduling the message.
    
    var waitTime = (endTime-date.getTime())/1000;

    //Creating a scheduler with setTimeoutFunction based on the request date and time.
    setTimeout(() => {
        post.save()
        .then((response) => {
            console.log('message updated to the mongo');
        })
        .catch(error => resp.status(400).send("error"+ error))
    }, waitTime);

    console.log(waitTime);
    console.log(date.getTime());
    console.log(endTime);

    resp.status(200).send("Done, message scheduled");


});

//fetch all the message from the mongoDB
app.get('/',(req,resp) => {
    Post.find()
    .then((response) => {
        resp.status(200).send(response);
    })
    .catch(error => resp.status(400).send(error))
});


module.exports = app;