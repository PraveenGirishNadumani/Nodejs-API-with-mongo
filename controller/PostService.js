const bodyParser = require('body-parser');
const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const Post = require('../models/postModel');


const app = express.Router();
app.use(bodyParser.json());

//Connecting to MongoBD server.
mongoose.connect('mongodb+srv://praveen:praveen@cluster0.tbwf2.mongodb.net/Posts', {useNewUrlParser: true, useUnifiedTopology: true  });


//Post message to the MongoBD
app.post('/', (req,resp) => {

    let post = new Post();
    post.message = req.body.message;
    post.date = req.body.date;
    post.time = req.body.time;
    post.save()
    .then((response) => {
        resp.status(200).send("Done"+response);
    })
    .catch(error => resp.status(400).send("error"+ error))
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