const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password:String,
    budget:{
        type:Number,
        default:30000
    },
});

module.exports = mongoose.model('User', UserSchema);
