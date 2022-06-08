const User = require('../../models/user');

module.exports.home = async function(req, res){

    let users = await User.find({ }, '_id name imageUrl');

    return res.status(200).json({
        message: "List of Products",
        users: users
    });
};