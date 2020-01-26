const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/thingsgame", {
    useNewUrlParser: true,
    useFindAndModify: false
});

const Game = require('./models/game');
const User = require('./models/user');

Game.deleteMany({}, (err, res) => {});
User.deleteMany({}, (err, res) => {});

const server = app.listen(port, () => {
    console.log(`🌎  ==> Server now listening on PORT ${PORT}!`);

    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        try {
            require('./events/GameSetup')(socket, io);
            require('./events/GameStart')(socket, io);
            require('./events/SubmitPrompt')(socket, io);
            require('./events/Response')(socket, io);
            require('./events/Vote')(socket, io);
            require('./events/EndRound')(socket, io);
        }
        catch (err) {
            console.log("Server error: " + err);
        }
    });
})
