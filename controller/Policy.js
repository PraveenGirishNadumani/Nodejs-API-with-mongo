const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {User, User_account, Policy, Agent} = require('../models/dataModels');



const app = express.Router();
app.use(bodyParser.json());

//Connecting to MongoBD server.
mongoose.connect('mongodb+srv://praveen:praveen@cluster0.tbwf2.mongodb.net/InsuranceDB', {useNewUrlParser: true, useUnifiedTopology: true  });


app.post('/', (req, res) =>{

    try{
        let responseArry = [];
        User.findOne({first_name:req.body.first_name})
        .then((response)=>{
            Policy.findOne({_id:response.policy_id})
            .then((response) => {
                responseArry.push({'Policy':response});
                Agent.findOne({_id:response.agent_id})
                .then((response) => {
                    responseArry.push({'Agent':response});
                    res.status(200).send(responseArry);
                })
                .catch((error) => {
                    console.log('Error fetching agent: '+error);
                    res.status(400).send('Error fetching agent');
                })
            })
            .catch((error) => {
                console.log('Error getting policy: '+ error);
                res.status(400).send('Error getting policy');
            })
        })
        .catch(error => console.log('error fetching User: '+ error))
    }
    catch(error)
    {
        res.status(500).send('Internal Server error');
        console.log('Server error: '+error);
    }

});

app.post('/agent', (req,resp) =>{
    try{
        let responseArray1 = [];
        Agent.findOne({agent_name:req.body.agent_name})
        .then((response) => {
            Policy.find({agent_id:response.id})
            .then((response) => {
                resp.status(200).send(response);
            })
            .catch((error => {
                console.log('Error fetching Policy(agent): '+ error);
                resp.status(400).send('Error fetching Policy');
            }))
        })
        .catch((error) => {
            console.log('Erro fetching agent:'+error);
            resp.status(400).send('Error fetching agent');
        })
    }
    catch(error)
    {
        res.status(500).send('Internal Server error');
        console.log('Server error: '+error);
    }
})

module.exports = app;