const {parentPort, MessagePort, workerData} = require('worker_threads');
const mongoose = require('mongoose');

const csv = require('csv-parser');
const fs = require('fs');
const {User, User_account, Policy, Agent} = require('../../models/dataModels');
const multer = require('multer');

const upload = multer();

//connecting to mongoose DB
mongoose.connect('mongodb+srv://praveen:praveen@cluster0.tbwf2.mongodb.net/InsuranceDB', {useNewUrlParser: true, useUnifiedTopology: true  });

const db = mongoose.connection;
let result = 0;

try{
    console.log('file patch in worker thread: ' +workerData);

    db.once('open', function(){
        let result = 0;
    
        // fs.createReadStream('data-sheet.csv')
        fs.createReadStream(`${__dirname}/../../files/${workerData}`)
            .pipe(csv({}))
            .on('data', (data) => {
                Agent.findOneAndUpdate({agent_name:data.agent},
                    {
                        agent_name: data.agent,
                        producer: data.producer
                    }, {new: true, upsert:true})
                .then((response) => {
                    Policy.findOneAndUpdate({policy_number:data.policy_number},
                        {
                            premium_amount: data.premium_amount,
                            premium_amount_written: data.premium_amount_written,
                            policy_start_date: data.policy_start_date,
                            policy_end_date: data.policy_end_date,
                            category_name: data.category_name,
                            company_name: data.company_name,
                            policy_number: data.policy_number,
                            policy_mode: data.policy_mode,
                            policy_type: data.policy_type,
                            agent_id: response.id
                        }, {new: true, upsert:true})
                        .then((response) => {
                            User.findOneAndUpdate({email:data.email},
                                {
                                    email: data.email,
                                    first_name: data.firstname,
                                    gender: data.gender,
                                    city: data.city,
                                    phone: data.phone,
                                    address: data.address,
                                    state: data.state,
                                    zip: data.zip,
                                    dob: data.dob,
                                    policy_id: response.id
                                },
                                {new: true, upsert:true})
                                .then((response) => {
                                    User_account.findOneAndUpdate({account_name: data.account_name},
                                        {
                                            account_name: data.account_name,
                                            account_type: data.account_type,
                                            user_policy_id: response.id
                                        },
                                        {new: true, upsert:true})
                                        .then((response) => {
                                            console.log('user agent_id: '+ response.id);
                                        })
                                        .catch(error => console.log('error updating user account: '+ error))
                                })
                                .catch(error => console.log('error updating user: '+error))
                        })
                        .catch(error => console.log('error updatin policy: '+error))
                })
                .catch(error => console.log('error updating agent'+ error));
            })
            .on('end', () => {
                console.log("End of the file");
                parentPort.postMessage("Job done");

            })
    });
}
catch(err){
    console.log('error in worker thread: ' + err);
}