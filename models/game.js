const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    gameID: String,
    gameState: String,
    promptMaster: String,
    prompt: String,
    round: Number,
    users: Number,
    currentTurn: Number,
    allUsers: Array,
    hasWent: Array,
    gameWinner: String
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
