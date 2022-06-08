const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');
const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json());

const socketServer = require('http').createServer(app);
const socket = require('./config/socket').socket(socketServer);
socketServer.listen(5000);
console.log('socket server is listening on port 5000');

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
});