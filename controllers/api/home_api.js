const User = require('../../models/user');

module.exports.home = async function(req, res){

    let currUser = await User.findOne({ _id: req.user._id }, 'action').populate('action', 'block');
    
    const blockList = currUser.action.block;
    console.log(blockList);

    let users = await User.find({ }).populate('action');

    console.log(users[0]);

    // users = users.filter(el => el._id in blockList);
    
    return res.status(200).json({
        message: "List of Products",
        users: users
    });
};