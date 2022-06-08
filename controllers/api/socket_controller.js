const Action = require('../../models/actions');

module.exports.action = async function(senderName, receiverName, type){
    try{
        let image = await Action.findOne({user: receiverName});
        
        if(image){
            if(type == 1){
                if(image.superLike.find(el => el == senderName)){
                    image.superLike.pull(senderName);
                }
                else image.superLike.push(senderName);
                image.save();
            }
            else if(type == 2){
                if(image.like.find(el => el == senderName)){
                    image.like.pull(senderName);
                }
                else image.like.push(senderName);
                image.save();
            }
            else if(type == 3){
                if(image.block.find(el => el == senderName)){
                    image.block.pull(senderName);
                }
                else image.block.push(senderName);
                image.save();
            }
            console.log(image);
        }
        else{
            let newImage = await Action.create({user: receiverName});
            if(type == 1){
                newImage.superLike.push(senderName);
            }
            else if(type == 2){
                newImage.like.push(senderName);
            }
            else if(type == 3){
                newImage.push.push(senderName);
            }
            newImage.save();
            console.log(newImage);
        }
    }catch(error){
        console.log(error);
    }
    return;
}