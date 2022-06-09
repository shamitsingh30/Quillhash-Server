const Action = require('../models/actions');
const actionController = require('../controllers/api/socket_controller');

module.exports.socket = function(socketServer){

    let io = require('socket.io')(socketServer, {
        cors: {
            origin: 'http://localhost:3000'
        }
    });

    let onlineUsers = [];

    const addNewUser = (username, socketId) => {
        !onlineUsers.some(user => user.username === username) && onlineUsers.push({username, socketId});
    };

    const getUser = (username) => {
        return onlineUsers.find(user => user.username === username);
    }

    const removeUser = (socketId) => {
        onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
    }

    io.sockets.on('connection', function(socket){

        console.log('new connection received', socket.id);

        socket.on("newUser", (username) => {
            addNewUser(username, socket.id);
        })

        socket.on("sendNotification", async ({senderName, receiverName, type})=>{

            var actionInfo = await actionController.action(senderName, receiverName, type);
            console.log(actionInfo);
            const receiver = getUser(receiverName);
            
            if(receiver){
                io.to(receiver.socketId).emit("getNotification", {
                name: actionInfo.name,
                liked: actionInfo.liked,
                type
                })
            }
        })

        socket.on('disconnect', function(){
            console.log('socket disconnected');
            removeUser(socket.id);
        });
    });
}