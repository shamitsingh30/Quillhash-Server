const mongoose = require('mongoose');
const User = require('./user');

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        ref: 'User'
    },
    like: [
        {
            type: String
        }
    ],
    superLike: [
        {
            type: String
        }
    ],
    block: [
        {
            type: String
        }
    ]
}, {
    timestamps: true
});

const Action = mongoose.model('Action', userSchema);

module.exports = Action;