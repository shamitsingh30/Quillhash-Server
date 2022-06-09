const mongoose = require('mongoose');
const User = require('./user');

const userSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // refPath: 'User'
    },
    like: [
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ],
    superLike: [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ],
    block: [
        {
            type: mongoose.Schema.Types.ObjectId
        }
    ]
}, {
    timestamps: true
});

const Action = mongoose.model('Action', userSchema);

module.exports = Action;