const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
       type: String,
       unique: true,
       required: true
   },
   first_name: {
    type: String,
    unique: true,
    required: true
    },
   gender:String,
   city: String,
   phone: String,
   address: String,
   state: String,
   zip: String,
   dob: Date,
   policy_id: String
});
const User = mongoose.model('User', UserSchema);

const User_accountSchema = new Schema({
    account_name: {
        type: String,
        required: true
    },
    account_type: {
        type: String,
        required: true
    },
    user_policy_id: String
});
const User_account = mongoose.model('User_account', User_accountSchema);

const PolicySchema = new Schema({
    premium_amount: Number,
    premium_amount_written: Number,
    policy_start_date: Date,
    policy_end_date: Date,
    category_name: String,
    company_name: String,
    policy_number: {
        type: String,
        required: true,
        unique:true
    },
    policy_mode: String,
    policy_type: String,
    agent_id: String
});
const Policy = mongoose.model('Policy', PolicySchema);

const AgentSchema = new Schema({
    agent_name: {
        type: String,
        unique: true,
        required: true
    },
    producer: String
})
const Agent = mongoose.model('Agent', AgentSchema);


module.exports = {
    User,
    User_account,
    Policy,
    Agent
};