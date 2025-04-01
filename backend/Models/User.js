const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for storing gesture data

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;