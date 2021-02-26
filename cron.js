const cron = require('node-cron');
const {Post,LivePost} = require('./models/postModel');
const mongoose = require('mongoose');

mongoose.connect(process.env.MongoUrl, {useNewUrlParser: true, useUnifiedTopology: true  }, () => {
    console.log('connected to mongoose from cron:');
});

let currenttime;


cron.schedule('1-59 * * * *', () => {
    currenttime = new Date().setSeconds(0,0);

    var livePost = new LivePost();

    Post.find({epochtime:currenttime})
    .then((response) => {
        response.forEach((responseValue) => {
            delete responseValue._id;
        })
        LivePost.insertMany(response)
        .then((response) => {
            console.log('Saved many data: '+response);
        })
        .catch(error => console.log('error saving many: '+error))
    })
    .catch((error) => {
        console.log('Error while fetching the POST for cron: '+error);
    })
});