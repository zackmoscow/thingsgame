const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const userRoutes = require('./routes/user');
const routes = require('./routes/index');
require('dotenv').config;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/thingsgame", {
    useNewUrlParser: true,
    useFindAndModify: false
});

app.use('/', routes);

// Error handling
app.use(function(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        // Send the error rather than to show it on the console
        res.status(401).send(err);
    } else {
        next(err);
    }
});

const Game = require('./models/game');

Game.deleteMany({}, (err, res) => {});

const server = app.listen(PORT, () => {
    console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);
    
    const io = require('socket.io')(server);
    
    io.on('connection', (socket) => {
        
        try {
            require('./events/GameEnd')(socket, io);
        } catch (err) {
            console.log("Server error GameEnd: " + err);
        }
        
        try {
            require('./events/GameSetup')(socket, io);
        } catch (err) {
            console.log("Server error GameSetup: " + err);
        }
        
        try {
            require('./events/GameStart')(socket, io);
        } catch (err) {
            console.log("Server error GameStart: " + err);
        }

        try {
            require('./events/GetInfo')(socket, io);
        } catch (err) {
            console.log("Server error GetInfo: " + err);
        }

        try {
            require('./events/Match')(socket, io);
        } catch (err) {
            console.log("Server error Match: " + err);
        }    
        

        try {
            require('./events/NextRound')(socket, io);
        } catch (err) {
            console.log("Server error NextRound: " + err);
        }

        try {
            require('./events/Response')(socket, io);
        } catch (err) {
            console.log("Server error Response: " + err);
        }

        try {
            require('./events/SubmitPrompt')(socket, io);
        } catch (err) {
            console.log("Server error SubmitPrompt: " + err);
        }
    });
})
