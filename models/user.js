const mongoose = require('mongoose');
const Action = require('./actions');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    action: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Action'
        }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;