const Action = require('../../models/actions');
const User = require('../../models/user');

module.exports.action = async function(senderId, receiverId, type){

    var liked = false;
    var name = {_id: '1', name:"Someone"};
    if(type == 'superliked'){
        name = await User.findOne({_id: senderId}, 'name');
    }
    try{
        let image = await Action.findOne({user: receiverId});
        
        if(image){
            if(type == 'superliked'){
                if(image.superLike.find(el => el == senderId)){
                    // image.superLike.pull(senderId);
                    image.superLike.pull(senderId);
                }
                else{
                    image.superLike.push(senderId);
                    liked = true;
                }
                image.save();
            }
            else if(type == 'liked'){
                if(image.like.find(el => el == senderId)){
                    image.like.pull(senderId);
                }
                else{
                    image.like.push(senderId);
                    liked = true;
                }
                image.save();
            }
            else if(type == 'blocked'){
                if(image.block.find(el => el == senderId)){
                    image.block.pull(senderId);
                }
                else image.block.push(senderId);
                image.save();
            }
            console.log(image);
        }
        else{
            let newImage = await Action.create({user: receiverId});
            if(type == 'superliked'){
                newImage.superLike.push(senderId);
            }
            else if(type == 'liked'){
                newImage.like.push(senderId);
            }
            else if(type == 'blocked'){
                newImage.block.push(senderId);
            }
            newImage.save();
            await User.findByIdAndUpdate(receiverId, {action: newImage._id});
            liked = true;
            console.log(newImage);
        }
    }catch(error){
        console.log(error);
    }
    return {name: name.name, liked};
}