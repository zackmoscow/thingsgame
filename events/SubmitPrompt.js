const Events = require('../helpers/Events');
const GameStates = require('../helpers/GameStates');
const UserStates = require('../helpers/UserStates');
const Game = require('../models/game');
const User = require('../models/user');
const Info = require('./GetInfo');

function submitPrompt(socket, io) {
  console.log("RUNNING SUBMIT PROMPT!");
  socket.on(Events.SUBMITTED_PROMPT, (gameID, prompt) => {
    console.log("Events.SUBMITTED_PROMPT", gameID, prompt);
    // Capture and trim passed in prompt

    prompt = prompt.trim();

      // Reference the correct game

      Game.findOne({ gameID: gameID }, (err, game) => {
        if (err) {
          socket.emit(Events.ERROR, err);
          return;
        }
        User.findOne({ gameID: gameID, turn: 1 }, (err, promptmaster) => {
          if (err) {
            socket.emit(Events.ERROR, err);
            return;
          }

          // Update game state to responding and pass in prompt

          Game.updateOne({ gameID: gameID }, { gameState: GameStates.RESPONDING, prompt: prompt }, (err, res) => {
            if (err) {
              socket.emit(Events.ERROR, err);
              return;
            }

            // Update all user states to noResponse

            User.updateMany({ gameID: gameID }, { state: UserStates.NO_RESPONSE, response: '' }, (err, res) => {
              if (err) {
                socket.emit(Events.ERROR, err);
                return;
              }

            // Emit update
            
              Info.getUserInfo(gameID, (userInfo) => {
                Info.getGameInfo(gameID, (gameInfo) => {
                  io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
                });
              });
            })
          });
        })
      })
  });
}

module.exports = submitPrompt;






