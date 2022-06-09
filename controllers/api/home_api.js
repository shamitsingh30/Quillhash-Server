const User = require('../../models/user');

module.exports.home = async function(req, res){

    let currUser = await User.findOne({ _id: req.user._id }, 'action').populate('action', 'block');
    
    // let blockList = [];
    // if(currUser.hasOwnProperty('action')){
        let blockList = currUser.action?.block;
        blockList = blockList?.map(el => el.toString());
    // }

    let users = await User.find({ }).populate('action');

    if(blockList) users = users.filter(el => !blockList.includes(el._id.toString()));
    
    return res.status(200).json({
        message: "List of Products",
        users: users
    });
};