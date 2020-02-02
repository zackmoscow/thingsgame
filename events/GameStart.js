const Events = require('../helpers/Events');
const GameStates = require('../helpers/GameStates');
const UserStates = require('../helpers/UserStates');
const Game = require('../models/game');
const User = require('../models/user');
const Info = require('./GetInfo');

function startGame(socket, io) {

  const promptTurn = {
    allUsers: [],
    hasWent: [],
  };

  socket.on(Events.START_ROUND, (gameID) => {
    User.find({ gameID: gameID }, (err, users) => {
      if (err) {
        socket.emit(Events.ERROR, err);
        return;
      }

      // Validate we have enough users

      if (users.length > 2) {

        // Update promptTurn object

        promptTurn.allUsers = users.map(o => o._id);

        // Update game state to prompt and push allUsers

        Game.findOneAndUpdate({ gameID: gameID }, { gameState: GameStates.PROMPT, prompt: '', allUsers: promptTurn.allUsers }, (err, game) => {
          if (err) {
            socket.emit(Events.ERROR, err);
            return;
          }

          // Assign all users state of "waiting"

          User.updateMany({ gameID: gameID }, { state: UserStates.WAITING, response: '' }, (err, res) => {
            if (err) {
              socket.emit(Events.ERROR, err);
              return;
            }

          // update promptmaster state to prompt

            User.findOneAndUpdate({ gameID: gameID, promptMaster: true }, { state: UserStates.PROMPT }, (err, user) => {
              if (err) {
                socket.emit(Events.ERROR, err);
                return;
              }

              promptTurn.hasWent.push(user._id);

              // push hasWent

              Game.findOneAndUpdate({ gameID: gameID }, { hasWent: promptTurn.hasWent }, (err, res) => {
                if (err) {
                  socket.emit(Events.ERROR, err);
                  return;
                }

                // emit update 

                Info.getUserInfo(gameID, (userInfo) => {
                  Info.getGameInfo(gameID, (gameInfo) => {
                    io.to(gameID).emit(Events.UPDATE, gameInfo, userInfo);
                  });
                });
              });
            });
          });
        });
      }
      else { 
        socket.emit(Events.NOT_ENOUGH_USERS, users.length);
      }
    });
  });
}

module.exports = startGame;