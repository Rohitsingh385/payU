const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true, 
    },
    lastname: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    }

})
const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})
const userModel = mongoose.model('User', UserSchema);
const accountModel = mongoose.model('Account', accountSchema);
module.exports = {userModel, accountModel};