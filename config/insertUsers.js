const mongoose = require('mongoose');

const data = require('../assets/authenticatedUsers.json');

const User = require('../models/user');
const db = require('../config/mongoose');

User.deleteMany({}, function(err){
    if(err) console.log(err);
});

User.insertMany(data, function(err, r){
    if(err){
        return console.log("Error in store database", err)
    };
    return console.log("Database populated");
})