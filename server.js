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

// // Error handling
// app.use(function(err, req, res, next) {
//     if (err.name === "UnauthorizedError") {
//         // Send the error rather than to show it on the console
//         res.status(401).send(err);
//     } else {
//         next(err);
//     }
// });

const Game = require('./models/game');

Game.deleteMany({}, (err, res) => {});

const server = app.listen(PORT, () => {
    console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);

    const io = require('socket.io')(server);

    io.on('connection', (socket) => {

        try {
            require('./events/GameEnd')(socket, io);
            require('./events/GameSetup')(socket, io);
            require('./events/GameStart')(socket, io);
            require('./events/GetInfo')(socket, io);
            require('./events/Match')(socket, io);
            require('./events/NextRound')(socket, io);
            require('./events/Response')(socket, io);
            require('./events/SubmitPrompt')(socket, io);           
        }
        catch (err) {
            console.log("Server error: " + err);
        }
    });
})
