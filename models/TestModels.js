const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        unique: true
    },
    last_name:{
        type: String
    },
    age:{
        type: Number
    },
    employeeId:{
        type:String
    }
},{timestamps:true});

const ExampleSchema = new Schema({
    agent: String,
    userType: String,
    policy_mode: Number,
    producer: String,
    policy_number: String,
    premium_amount_written: String,
    premium_amount: Number,
    policy_type: String,
    company_name: String,
    category_name: String,
    policy_start_date: Date,
    policy_end_date: Date,
    csr: String,
    account_name: String,
    email: String,
    gender: String,
    firstname: String,
    city: String,
    account_type: String,
    phone: String,
    address: String,
    state: String,
    zip: String,
    dob: Date,
    primary: String,
    agency_id: String,
    
});

const User = mongoose.model('User', UserSchema);
const Example = mongoose.model('Example', ExampleSchema);

module.exports = {
    User,
    Example
};
