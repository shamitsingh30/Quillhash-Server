const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: "Invalid username or password"
            });
        }
        return res.status(200).json({
            message: 'Sign in successful, token generated!',
            auth: true,
            data:{
                id: user._id,
                token: jwt.sign(user.toJSON(), 'topsecret', {expiresIn: '1000000'})
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "internal server error"
        });
    }
}

module.exports.signIn = function(req, res){
    console.log(req.body);
    return res.status(200). json({
        message: 'Received'
    })
}

module.exports.signUp = async function(req, res){

    if(req.body.password != req.body.confirmPassword){
        return res.status(200).json({
            message: 'Password and Confirm password did not match',
            valid: false
        });
    };

    User.findOne({email: req.body.email}, function(err, user){
        if(!user){
            User.create(req.body, function(err, u){
                if(err){
                    return res.status(200).json({
                        message: 'Error in creating user while signing up',
                        valid: false
                    });
                }
                return res.status(200).json({
                    message: 'User signed up',
                    valid: true
                });
            })
        };

    });
}